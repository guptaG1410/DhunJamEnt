import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {};

  return (
    <div className="flex items-center justify-center h-screen text-white bg-black">
      <div className="space-y-10 px-2 sm:px-0 w-full sm:w-[600px]">
        <h1 className="text-3xl font-semibold text-center">
          Venue Admin Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className="w-full p-2 bg-transparent border rounded-xl"
              type="text"
              placeholder="Username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Please enter the valid username",
                },
              })}
            />
            {errors?.username && (
              <p className="mt-2 mb-2 text-sm text-red-500">
                * {errors?.username?.message}
              </p>
            )}
          </div>

          <div className="relative flex flex-col mt-5">
            <input
              className="w-full p-2 bg-transparent border rounded-xl"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Please enter the valid password",
                },
              })}
            />
            {isPasswordVisible ? (
              <button
                type="button"
                className="absolute self-center transform translate-y-[40%] right-2"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <IoEyeOffSharp
                  onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                  className="w-6 h-6"
                  size={30}
                />
              </button>
            ) : (
              <button
                type="button"
                className="absolute self-center transform translate-y-[40%] right-2"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <IoEyeSharp
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="w-6 h-6"
                  size={30}
                />
              </button>
            )}

            {errors?.password && (
              <p className="mt-2 mb-2 text-sm text-red-500">
                * {errors?.password?.message }
              </p>
            )}
          </div>

          <button className="bg-[#6741D9] font-bold   hover:border-[#F0C3F1] rounded-2xl p-3 mt-8 mb-1 border border-black ease-in-out duration-300 w-full">
            {isSubmitting ? "Signing in" : "Sign in"}
          </button>
          <Link to={"/"}>
            <p className="text-sm text-center">New Registeration ?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
