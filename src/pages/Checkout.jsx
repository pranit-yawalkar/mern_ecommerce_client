import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import InputWidget from "../widgets/InputWidget";
import ButtonWidget from "../widgets/ButtonWidget";
import laptop from "../assets/images/products/laptop.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  createAnOrder,
  emptyUserCart,
  getCart,
} from "../features/user/userSlice";
import Color from "../components/Color";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { base_url, config } from "../utils/axiosConfig";

const shippingSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  other: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.string().required("Pincode is required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const [total, setTotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(50);
  const [cartProductState, setCartProductState] = useState([]);

  useEffect(() => {
    dispatch(getCart());
    getOrderItems();
    setShippingCharges(50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSubtotal(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartState]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      other: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      checkoutHandler(values);
    },
  });

  const getOrderItems = () => {
    const items = [];
    for (let i = 0; i < cartState?.length; i++) {
      items.push({
        product: cartState[i]?.productId?._id,
        quantity: cartState[i]?.quantity,
        color: cartState[i]?.color?._id,
        price: cartState[i]?.price,
      });
    }
    setCartProductState(items);
  };

  const getSubtotal = () => {
    let subtotal = 0;
    for (let i = 0; i < cartState?.length; i++) {
      subtotal =
        subtotal + Number(cartState[i]?.quantity * cartState[i]?.price);
      setTotal(subtotal);
    }
  };

  const createOrder = (shippingInfo, paymentInfo) => {
    dispatch(
      createAnOrder({
        totalPrice: total,
        totalPriceAfterDiscount: total,
        orderItems: cartProductState,
        paymentInfo,
        shippingInfo,
      })
    );
    if (authState?.orderedProduct !== null && authState?.isSuccess) {
      formik.resetForm();
      dispatch(emptyUserCart());
      navigate("/orders");
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const checkoutHandler = async (shippingInfo) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const result = await axios.post(
      `${base_url}user/order/checkout`,
      { amount: total + shippingCharges },
      config
    );
    if (!result) {
      alert("Something went wrong");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.RAZORPAYKEY, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Shopping Spot",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post(
          `${base_url}user/order/verify-payment`,
          data,
          config
        );

        if (result?.status === 200) {
          createOrder(shippingInfo, result?.data);
        }
      },
      prefill: {
        name: "Pranit Yawalkar",
        email: "pranit@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Shopping Spot Corporate Office",
      },
      theme: {
        color: "#4F46E5",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Meta title="Checkout - ShoppingSpot" />
      <div className="bg-gray-100 pb-10 md:pb-20">
        <div className="max-w-[1300px] bg-white shadow-md rounded-lg mx-auto flex gap-5">
          <div className="w-1/2 p-8">
            <Link to="/cart" className="flex gap-3 text-color-2 items-center">
              <BsArrowLeft /> Return to Cart
            </Link>
            <h3 className="text-2xl font-bold my-8">Contact Information</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-6 my-5">
                <div>
                  <select
                    name="country"
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    value={formik.values.country}
                    id="country"
                    className={`outline-none border-2 w-full rounded-md px-2 py-1 text-black focus:border-2 focus:border-color-2 ${
                      formik.touched.country && formik.errors.country
                        ? "border-red-300"
                        : ""
                    } `}
                  >
                    <option value="" selected>
                      Select Country
                    </option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </select>
                  <div className={`text-xs text-color-8 ml-2`}>
                    {formik.touched.country && (formik.errors.country ?? " ")}{" "}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-full">
                    <InputWidget
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                      isError={
                        formik.touched.firstName && formik.errors.firstName
                          ? true
                          : false
                      }
                      errorMsg={
                        formik.touched.firstName && formik.errors.firstName
                          ? `${formik.errors.firstName}`
                          : "  "
                      }
                    />
                  </div>
                  <div className="w-full">
                    <InputWidget
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                      isError={
                        formik.touched.lastName && formik.errors.lastName
                          ? true
                          : false
                      }
                      errorMsg={
                        formik.touched.lastName && formik.errors.lastName
                          ? `${formik.errors.lastName}`
                          : "  "
                      }
                    />
                  </div>
                </div>
                <InputWidget
                  name="address"
                  type="text"
                  placeholder="Address 1"
                  value={formik.values.address}
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                  isError={
                    formik.touched.address && formik.errors.address
                      ? true
                      : false
                  }
                  errorMsg={
                    formik.touched.address && formik.errors.address
                      ? `${formik.errors.address}`
                      : "  "
                  }
                />
                <InputWidget
                  name="other"
                  type="text"
                  placeholder="Address 2"
                  value={formik.values.other}
                  onChange={formik.handleChange("other")}
                  onBlur={formik.handleBlur("other")}
                  isError={
                    formik.touched.other && formik.errors.other ? true : false
                  }
                  errorMsg={
                    formik.touched.other && formik.errors.other
                      ? `${formik.errors.other}`
                      : "  "
                  }
                />
                <div className="flex gap-3">
                  <div className="w-full">
                    <InputWidget
                      name="city"
                      type="text"
                      placeholder="City"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                      isError={
                        formik.touched.city && formik.errors.city ? true : false
                      }
                      errorMsg={
                        formik.touched.city && formik.errors.city
                          ? `${formik.errors.city}`
                          : "  "
                      }
                    />
                  </div>
                  <div className="w-full">
                    <InputWidget
                      name="state"
                      type="text"
                      placeholder="State"
                      value={formik.values.state}
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                      isError={
                        formik.touched.state && formik.errors.state
                          ? true
                          : false
                      }
                      errorMsg={
                        formik.touched.state && formik.errors.state
                          ? `${formik.errors.state}`
                          : "  "
                      }
                    />
                  </div>
                  <div className="w-full">
                    <InputWidget
                      name="pincode"
                      type="number"
                      placeholder="Pin Code"
                      value={formik.values.pincode}
                      onChange={formik.handleChange("pincode")}
                      onBlur={formik.handleBlur("pincode")}
                      isError={
                        formik.touched.pincode && formik.errors.pincode
                          ? true
                          : false
                      }
                      errorMsg={
                        formik.touched.pincode && formik.errors.pincode
                          ? `${formik.errors.pincode}`
                          : "  "
                      }
                    />
                  </div>
                </div>
                <div className="text-right my-5">
                  <ButtonWidget
                    color={"bg-color-6"}
                    textcolor={"white"}
                    text={"Continue to Shipping"}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="w-1/2">
            {cartState &&
              cartState?.map((product, index) => (
                <div
                  key={product?._id}
                  className="flex items-center justify-between px-8 py-5 border-b-2 border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product?.productId?.images[0]?.url || laptop}
                      alt={product?.productId?.title}
                    />
                    <div>
                      <h6 className="text-lg font-bold">
                        {product?.productId?.title}
                      </h6>
                      <p className="flex gap-3">
                        Color: <Color colorData={[product?.color]} />
                      </p>
                      <p>Qty: {product?.quantity}</p>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-color-1 text-lg font-medium">
                      ₹{product?.price}
                    </h6>
                  </div>
                </div>
              ))}
            <div className="p-8 border-b-2 border-gray-200">
              <div className="flex justify-between">
                <span className="text-md font-medium">Subtotal: </span>
                <span className="text-md font-medium">₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-md font-medium">Shipping Charges: </span>
                <span className="text-md font-medium">₹{shippingCharges}</span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between">
                <span className="text-xl font-bold">Total: </span>
                <span className="text-xl font-bold text-color-1">
                  ₹{total + shippingCharges}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
