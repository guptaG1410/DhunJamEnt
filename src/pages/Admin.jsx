import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  Colors,
  BarController,
  BarElement,
  Legend,
} from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  Colors,
  BarController,
  BarElement,
  Legend
);

const Admin = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    id: "",
    name: "",
    location: "",
    charge_customers: true,
    amount: {
      category_6: "",
      category_7: "",
      category_8: "",
      category_9: "",
      category_10: "",
    },
  });
  const [willCharge, setWillCharge] = useState(true);

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
    setValue,
    watch,
  } = useForm();

  // data for chart
  const data = {
    labels: ["Custom", "Category1", "Category2", "Category3", "Category4"],
    datasets: [
      {
        label: "Amount Chart",
        backgroundColor: "#F0C3F1",
        borderColor: "#ffffff",
        borderWidth: 1,
        hoverBackgroundColor: "#edb8ef",
        data: [
          watch("amount.category_6"),
          watch("amount.category_7"),
          watch("amount.category_8"),
          watch("amount.category_9"),
          watch("amount.category_10"),
        ],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}  ");
    if (!userData.token) {
      navigate("/login");
      return;
    }
    fetchUserDetails(userData);
  }, [navigate, setValue]);

  const fetchUserDetails = async (userData) => {
    try {
      const res = await axios.get(
        `https://stg.dhunjam.in/account/admin/${userData?.id}`
      );
      if (res?.data?.status === 200) {
        setUserDetails(res?.data?.data);
        setValue("id", res?.data?.data?.id);
        setValue("name", res?.data?.data?.name);
        setValue("location", res?.data?.data?.location);
        setValue("amount", res?.data?.data?.amount);
        setValue("charge_customers", res?.data?.data?.charge_customers);
        setWillCharge(res?.data?.data?.charge_customers);
      }
      console.log(res);
    } catch (err) {
      toast.error(
        err?.response ? err?.response?.data?.ui_err_msg : "Failed to get data"
      );
      console.log("I'm here line 107");
      console.log(res);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(
        `https://stg.dhunjam.in/account/admin/${userDetails?.id}`,
        {
          amount: {
            ...data?.amount,
          },
        }
      );

      if (res?.data?.status === 200) {
        toast.success("Amount updated successfully");
        const authData = JSON.parse(localStorage.getItem("authData") || "{}");
        // fetchUserDetails(authData);
      }
    } catch (error) {
      toast.error(
        error?.response
          ? error?.response?.data?.ui_err_msg
          : "Failed to update data"
      );
    }
  };

  return (
    <main className="flex justify-center min-h-screen text-white bg-black">
      <div className="space-y-10 px-2 sm:px-0 w-full sm:w-[600px] my-10">
        <h1 className="text-3xl font-semibold text-center">
          {userDetails?.name}, {userDetails?.location} on Dhun Jam
        </h1>

        {/* container for options */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2 sm:gap-5">
            {/* for user concent */}
            <p>Do you want to charge your customers for requesting songs?</p>
            <div className="flex items-center justify-center gap-5">
              <label htmlFor="yes" className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value={"yes"}
                  id="yes"
                  className="mr-2"
                  checked={willCharge}
                  onChange={() => {
                    setWillCharge(true);
                    setValue("charge_customers", true);
                  }}
                />
                Yes
              </label>
              <label htmlFor="no" className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value={"no"}
                  id="no"
                  className="mr-2"
                  checked={!willCharge}
                  onChange={() => {
                    setWillCharge(false);
                    setValue("charge_customers", false);
                  }}
                />
                No
              </label>
            </div>

            {/* required amount */}
            <p>Custom song request amount-</p>
            <input
              type="number"
              className={`w-full p-2 text-center border rounded-xl transition-all duration-300 ease-in-out ${
                willCharge ? "bg-transparent" : "bg-gray-500"
              } ${errors && errors?.amount?.category_6 && "border-red-500"}`}
              disabled={!willCharge}
              {...register("amount.category_6", {
                min: {
                  value: 99,
                  message: "Entered value should be more than 99",
                },
              })}
            />

            {/* regular song */}
            <p>Regular song request amounts, from high to low-</p>
            <div className="flex items-center justify-between gap-2 sm:gap-5">
              <input
                type="number"
                className={`w-full p-2 text-center border rounded-xl transition-all duration-300 ease-in-out ${
                  willCharge ? "bg-transparent" : "bg-gray-500"
                } ${errors && errors?.amount?.category_7 && "border-red-500"}`}
                disabled={!willCharge}
                {...register("amount.category_7", {
                  min: {
                    value: 79,
                    message: "Entered value should be more than 79",
                  },
                })}
              />
              <input
                type="number"
                className={`w-full p-2 text-center border rounded-xl transition-all duration-300 ease-in-out ${
                  willCharge ? "bg-transparent" : "bg-gray-500"
                } ${errors && errors?.amount?.category_8 && "border-red-500"}`}
                disabled={!willCharge}
                {...register("amount.category_8", {
                  min: {
                    value: 59,
                    message: "Entered value should be more than 59",
                  },
                })}
              />
              <input
                type="number"
                className={`w-full p-2 text-center border rounded-xl transition-all duration-300 ease-in-out ${
                  willCharge ? "bg-transparent" : "bg-gray-500"
                } ${errors && errors?.amount?.category_9 && "border-red-500"}`}
                disabled={!willCharge}
                {...register("amount.category_9", {
                  min: {
                    value: 39,
                    message: "Entered value should be more than 39",
                  },
                })}
              />
              <input
                type="number"
                className={`w-full p-2 text-center border rounded-xl transition-all duration-300 ease-in-out ${
                  willCharge ? "bg-transparent" : "bg-gray-500"
                } ${errors && errors?.amount?.category_10 && "border-red-500"}`}
                disabled={!willCharge}
                {...register("amount.category_10", {
                  min: {
                    value: 19,
                    message: "Entered value should be more than 19",
                  },
                })}
              />
            </div>
          </div>

          {/* adding the chart */}
          {willCharge && (
            <div className="my-10">
              <Bar data={data} options={options} />
            </div>
          )}

          {/* submit button */}
          <button
            disabled={!willCharge}
            className={`bg-[#6741D9] font-bold   hover:border-[#F0C3F1] rounded-2xl p-3 mt-8 mb-1 border border-black ease-in-out duration-300 w-full ${
              (!willCharge || errors?.amount) && "bg-gray-500 my-5"
            }`}
          >
            {isSubmitting ? "Updating ..." : "Save"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Admin;
