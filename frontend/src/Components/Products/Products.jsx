import React from "react";
import Cards from "./Cards";
import "./products.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const [foodCategory, setfoodCategory] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const searchvalue = useSelector((state) => state.search.value);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async (data) => {
    try {
      const response = await fetch(
        "https://food-hut-mern-backend-git-master-irtazamanzoor009s-projects.vercel.app/getfood/getfood",        
        {
          method: "GET",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await response.json();
      setfoodCategory(json[1]);
      setfoodItem(json[0]);
    } catch (error) {
      setfoodItem([]);
      setfoodCategory([]);
      console.log("Error is: ",error);
    }
  };

  return (
    <div className="main-products">
      {foodCategory.length > 0 &&
        foodCategory.map((Cat) => {
          return (
            <div key={Cat.id}>
              <h1>{Cat.CategoryName}</h1>
              <hr className="mainline" />
              <div className="container">
                <div className="row">
                  {
                    // {foodItem.length > 0 &&
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === Cat.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(searchvalue.toLowerCase())
                      )
                      .map((filteredItem) => {
                        return (
                          <div key={filteredItem.id}>
                            <Cards items={filteredItem} />
                          </div>
                        );
                      })
                  }
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Products;
