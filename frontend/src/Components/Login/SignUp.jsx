import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useForm } from "react-hook-form";
import "./login.css";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
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
    setServerError("");
    try
    {
      const response = await fetch(
        "https://food-hut-mern-backend-git-master-irtazamanzoor009s-projects.vercel.app/signup/createuser",
        {
          method: "POST",
          body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log(data);
    const result = await response.json();

    if (!result.success) {
      if (result.error === "Email already exists") {
        setServerError("Email already exists");
      } else {
        setServerError("An error occurred. Please try again.");
      }
      setIsLoading(false);
      setTimeout(()=>{
        setServerError("")
      },1000);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      reset();
    }, 1000);
  }
  catch
  {
    setServerError("An error occurred. Please try again.")
  }
  };

  return (
    <>
      <Navbar />

      <div className="signup-container-signup signup-container">
        <div className="signup">
          <div className="signupForm">
            <h3>Sign Up</h3>
            {showSuccessMessage && (
              <div className="green msgs">User Signed Up Successfully</div>
            )}
            {serverError && <div className="red msgs">{serverError}</div>}
            {errors.username && (
              <div className="red msgs">{errors.username.message}</div>
            )}
            {errors.password && (
              <div className="red msgs">{errors.password.message}</div>
            )}
            {errors.email && (
              <div className="red msgs">{errors.email.message}</div>
            )}
            {errors.location && (
              <div className="red msgs">{errors.location.message}</div>
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
                  minLength: {
                    value: 3,
                    message: "Length of password must be greater then 3",
                  },
                  maxLength: {
                    value: 10,
                    message: "Length of password must be less then 10",
                  },
                })}
              />
              <input
                type="text"
                placeholder="Enter Username"
                {...register("username", {
                  required: { value: true, message: "Please Enter UserName" },
                  minLength: {
                    value: 3,
                    message: "Length of usename must be 3",
                  },
                  maxLength: {
                    value: 10,
                    message: "Length of username must be less then 10",
                  },
                })}
              />

              <input
                type="text"
                placeholder="Enter Location"
                {...register("location", {
                  required: { value: true, message: "Please Enter Location" },
                })}
              />
              <button disabled={showSuccessMessage} type="submit">
                Sign Up
                {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
              </button>
            </form>
          </div>
          <p>
            Already have an account? <NavLink to="/signin">Sign In</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
