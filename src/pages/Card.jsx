import { useDispatch, useSelector } from "react-redux";
import { remove, updateQuantity } from "../store/StoreSlice";
import empty from "../assets/empty.png";
import { useNavigate } from "react-router";
import { FaRegTrashAlt } from "react-icons/fa";
import Delivery from "../component/Delivery";
import BillDetail from "../component/BillDetail";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import React from "react";


const Card = ({ location, getLocation }) => {
  const product = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };
  const removeToCard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(remove(id));
        toast.error("Product removed!");
      }
    });
  };

  const totalPrice = product.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
        {product.length > 0 ? (
          <div>
            <h1 className="font-bold text-2xl ">My Cart ({product.length})</h1>
            <div>
              <div className="mt-10">
                {product.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.model}
                          className="w-20 h-20 rounded-md cursor-pointer"
                          onClick={() => navigate(`/products/${item.id}`)}
                        />
                        <div>
                          <h1
                            onClick={() => navigate(`/products/${item.id}`)}
                            className="md:w-[300px] line-clamp-2  cursor-pointer hover:text-blue-500"
                          >
                            {item.title}
                          </h1>
                          <p className="text-red-500 font-semibold text-lg">
                            ${item.price * item.quantity}
                          </p>
                        </div>
                      </div>

                      {/* Quantity button  */}
                      <div className="bg-red-500 text-white flex gap-4 p-2 px-4 rounded-md font-bold text-xl">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="cursor-pointer"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item)}
                          className="cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span
                        onClick={() => removeToCard(item.id)}
                        className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl"
                      >
                        <FaRegTrashAlt className="text-red-500 text-2xl cursor-pointer" />
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
                <Delivery location={location} getLocation={getLocation} />
                {/* Bill details section */}
                <BillDetail totalPrice={totalPrice} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 justify-center items-center h-[400px] mb-20 ">
            <h1 className="text-red-500/80 font-bold text-3xl text-muted mt-12">
              Your cart is empty
            </h1>
            <img src={empty} alt="" className="w-[300px]" />
            <button
              onClick={() => navigate("/products")}
              className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer "
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default Card;
