import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeFromCart } from "../Redux/slices/mobile.slice";

function Cart() {
  const cart = useSelector((state) => state.mobile.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item?.price, 0);
  const handleRemoveFromCart=  async (id) =>  {
    await dispatch(removeFromCart({id}));
  } 
  const handleApi = async () => {
    await dispatch(getCart());
  }
  useEffect(()=> {
    handleApi();

  }, [ ])
  return (
    <div className="max-w-[65rem] m-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-center mb-4 animate-pulse">Shopping Cart</h1>
      {cart.map((item , idx) => (
        <div key={idx} className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded-md shadow-sm transition-all transform hover:scale-105">
          <div className="flex items-center">
            <img
              src="https://rukminim2.flixcart.com/image/416/416/ktketu80/mobile/8/z/w/iphone-13-mlph3hn-a-apple-original-imag6vzzhrxgazsg.jpeg?q=70"
              alt={item.name}
              className="w-40 h-40 mr-4 rounded-md"
            />
            <div>
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600"> &#36;  {item.price}</p>
            </div>
          </div>
          <button
            onClick={()=> handleRemoveFromCart(item._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl font-bold">Total: {total} </h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;