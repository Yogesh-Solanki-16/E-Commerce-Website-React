import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { add } from "../store/StoreSlice";
import Loading from "../assets/loader.webm";
import { singleProductApi } from "../api/AxiosInstance";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const [SingleProduct, setSingleProduct] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = (item) => {
    dispatch(add(item));
    toast.success("Product added !");
  };

  const getSingleProduct = async () => {
    try {
      const res = await singleProductApi.get(`${params.id}`);
      const product = res.data.product;
      setSingleProduct(product);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    if (params.id) {
      getSingleProduct();
    }
  }, [params.id]);

  return (
    <>
      <div className="flex ms-10 m-4">
        <button
          onClick={() => {
            navigate("/products");
          }}
          className="p-4  bg-black text-white py-2 rounded hover:bg-red-500"
        >
          Back
        </button>
      </div>

      {SingleProduct ? (
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="flex justify-center items-center bg-white rounded-lg shadow-md p-4">
              <img
                src={SingleProduct.image}
                alt={SingleProduct.title}
                className="rounded-xl object-contain w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center gap-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {SingleProduct.title}
              </h1>

              <div className="text-gray-600 text-sm md:text-base">
                <span className="uppercase font-semibold">
                  {SingleProduct.brand}
                </span>
                {" / "}
                <span className="uppercase">{SingleProduct.category}</span>
                {" / "}
                <span>{SingleProduct.model}</span>
              </div>

              {/* Price & Discount */}
              <div className="text-xl text-red-500 font-bold flex flex-wrap items-center gap-4">
                <span>₹{SingleProduct.price}</span>
                {SingleProduct.discount > 0 && (
                  <>
                    <span className="text-gray-500 text-sm line-through">
                      ₹
                      {(
                        SingleProduct.price +
                        SingleProduct.price * (SingleProduct.discount / 100)
                      ).toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {SingleProduct.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {SingleProduct.description}
              </p>

              {/* Quantity Selector */}
              {/* <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="w-20 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div> */}

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  className="w-full bg-black hover:bg-red-500 text-white py-3 rounded-md text-sm font-semibold transition duration-300"
                  onClick={() => addToCart(SingleProduct)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Loading fallback
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop className="w-20 sm:w-32 md:w-40">
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};

export default SingleProduct;