import React, { useEffect } from "react";
import { useState } from "react";
import { getCart, updateCartQuantity } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const QuantityPicker = ({ id, qty }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(qty);

  useEffect(() => {
    dispatch(getCart());
  }, [quantity]);

  const increment = () => {
    updateProductFromCart(id, quantity + 1);
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      updateProductFromCart(id, quantity - 1);
      setQuantity(quantity - 1);
    }
  };

  const updateProductFromCart = (id, quantity) => {
    dispatch(updateCartQuantity({ cartItemId: id, quantity }));
    dispatch(getCart());
  };

  return (
    <>
      <div>
        <button
          className="bg-color-1 rounded-full w-6 h-6 text-white"
          onClick={decrement}
        >
          -
        </button>
        <input
          type="text"
          readOnly
          className="w-6 outline-none border-none text-center"
          value={quantity}
        />
        <button
          className="bg-color-1 rounded-full w-6 h-6 text-white"
          onClick={increment}
        >
          +
        </button>
      </div>
    </>
  );
};

export default QuantityPicker;
