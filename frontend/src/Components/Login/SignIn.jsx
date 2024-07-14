import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "../Login/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const navigate = useNavigate();
  const [Message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onsubmit = async (data) => {
    setIsLoading(true);
    const response = await fetch(
      "https://food-hut-mern-backend-git-master-irtazamanzoor009s-projects.vercel.app/signin/login",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("UserEmail", data.email);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
      navigate("/");
    } else {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 1000);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container-signin signup-container">
        <div className="signup">
          <div className="signupForm">
            <h3>Sign In</h3>
            {Message && <div className="red msgs">Invalid Credentials</div>}
            {errors.email && (
              <div className="red msgs">{errors.email.message}</div>
            )}
            {errors.password && (
              <div className="red msgs">{errors.password.message}</div>
            )}
            <form className="form" action="" onSubmit={handleSubmit(onsubmit)}>
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: { value: true, message: "Please Enter Email" },
                })}
              />
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: { value: true, message: "Please Enter Password" },
                })}
              />
              <button type="submit">
                Sign In
                {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
              </button>
            </form>
          </div>
          <p>
            Dont't have an account? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
