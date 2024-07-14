const express = require("express");
const router = express.Router();
const foodItem = require("../models/FoodItemsModel.js");
const FoodCategory = require("../models/FoodCategory.js");


router.get("/getfooditems",async(req,res)=>{
  try{
    const item = await foodItem.find();
    res.json(item);
  }
  catch(error)
  { 
    res.json({ success: false });
    console.log("Error is: ", error)
  }
})

router.get("/getfoodcategory",async(req,res)=>{
  try{
    const cat = await FoodCategory.find();
    res.json(cat);
  }
  catch(error)
  { 
    res.json({ success: false });
    console.log("Error is: ", error)
  }
})

router.get("/getfood",async(req,res)=>{
  try{
    const item = await foodItem.find();
    const cat = await FoodCategory.find();
    res.json([item,cat]);
  }
  catch(error)
  { 
    res.json({ success: false });
    console.log("Error is: ", error)
  }
})

module.exports = router;
