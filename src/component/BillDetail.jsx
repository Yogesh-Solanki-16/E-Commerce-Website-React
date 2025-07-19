import React from "react";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";

const BillDetail = ({ totalPrice }) => {
  return (
    <>
      <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
        <h1 className="text-gray-800 font-bold text-xl">Bill details</h1>
        <div className="flex justify-between items-center">
          <h1 className="flex gap-1 items-center text-gray-700">
            <span>
              <LuNotebookText />
            </span>
            Items total
          </h1>
          <p>${totalPrice}</p>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="flex gap-1 items-center text-gray-700">
            <span>
              <MdDeliveryDining />
            </span>
            Delivery Charge
          </h1>
          <p className="text-red-500 font-semibold">
            <span className="text-gray-600 line-through">$25</span> FREE
          </p>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="flex gap-1 items-center text-gray-700">
            <span>
              <GiShoppingBag />
            </span>
            Handling Charge
          </h1>
          <p className="text-red-500 font-semibold">$5</p>
        </div>
        <hr className="text-gray-200 mt-2" />
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">Grand total</h1>
          <p className="font-semibold text-lg">${totalPrice + 5}</p>
        </div>
        <div>
          <h1 className="font-semibold text-gray-700 mb-3 mt-7">
            Apply Promo Code
          </h1>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter code"
              className="p-2 rounded-md w-full"
            />
            <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
              Apply
            </button>
          </div>
        </div>
        <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default BillDetail;