import React, { useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import profileIcon from "../assets/images/profile/profile.png";
import { BsArrowLeft, BsPencilFill } from "react-icons/bs";
import ButtonWidget from "../widgets/ButtonWidget";
import { Link, useNavigate } from "react-router-dom";
import InputWidget from "../widgets/InputWidget";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userSlice";

let profileSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  mobile: string().required("Mobile is required"),
});

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const userState = useSelector((state) => state?.auth?.user?.user);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userState?.firstName,
      lastName: userState?.lastName,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values));
      setShowModal(false);
    },
  });
  return (
    <>
      <Meta title="Profile - ShoppingSpot" />
      <BreadCrumb title="Profile" />
      <div className="bg-gray-100 py-4">
        <div className="max-w-[1300px] bg-white  p-10 md:pb-20 mx-auto">
          {showModal ? (
            <>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                  className="fixed inset-0 w-full h-full bg-black opacity-40"
                  onClick={() => setShowModal(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                  <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="mt-3 sm:flex">
                      <form className="w-full" onSubmit={formik.handleSubmit}>
                        <div className="w-full text-center sm:text-left">
                          <h4 className="text-lg font-medium text-gray-800">
                            Edit Profile
                          </h4>
                          <div className="flex flex-col gap-5 my-5">
                            <InputWidget
                              type="text"
                              placeholder="Enter your first name"
                              value={formik.values.firstName}
                              onChange={formik.handleChange("firstName")}
                              onBlur={formik.handleBlur("firstName")}
                              isError={
                                formik.touched.firstName &&
                                formik.errors.firstName
                                  ? true
                                  : false
                              }
                              errorMsg={
                                formik.touched.firstName &&
                                formik.errors.firstName
                                  ? `${formik.errors.firstName}`
                                  : "  "
                              }
                            />
                            <InputWidget
                              type="text"
                              placeholder="Enter your last name"
                              value={formik.values.lastName}
                              onChange={formik.handleChange("lastName")}
                              onBlur={formik.handleBlur("lastName")}
                              isError={
                                formik.touched.lastName &&
                                formik.errors.lastName
                                  ? true
                                  : false
                              }
                              errorMsg={
                                formik.touched.lastName &&
                                formik.errors.lastName
                                  ? `${formik.errors.lastName}`
                                  : "  "
                              }
                            />
                            {/* <InputWidget
                              type="email"
                              placeholder="Enter your email"
                              value={formik.values.email}
                              onChange={formik.handleChange("email")}
                              onBlur={formik.handleBlur("email")}
                              isError={
                                formik.touched.email && formik.errors.email
                                  ? true
                                  : false
                              }
                              errorMsg={
                                formik.touched.email && formik.errors.email
                                  ? `${formik.errors.email}`
                                  : "  "
                              }
                            /> */}
                            <InputWidget
                              type="text"
                              placeholder="Enter your mobile number"
                              value={formik.values.mobile}
                              onChange={formik.handleChange("mobile")}
                              onBlur={formik.handleBlur("mobile")}
                              isError={
                                formik.touched.mobile && formik.errors.mobile
                                  ? true
                                  : false
                              }
                              errorMsg={
                                formik.touched.mobile && formik.errors.mobile
                                  ? `${formik.errors.mobile}`
                                  : "  "
                              }
                            />
                          </div>
                          <div className="items-center w-full gap-2 mt-8 sm:flex">
                            <ButtonWidget
                              text={"Update"}
                              color={"bg-color-1"}
                              textcolor={"white"}
                              width={"w-full"}
                              handleClick={() => setShowModal(true)}
                            />
                            <ButtonWidget
                              text={"Cancel"}
                              color={"bg-white"}
                              width={"w-full"}
                              textcolor={"black"}
                              handleClick={() => setShowModal(false)}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <div className="flex justify-between px-20 mb-10">
            <Link to="/" className="flex gap-3 text-color-2 items-center">
              <BsArrowLeft /> Return to Home
            </Link>
            <ButtonWidget
              text={
                <div className="flex gap-3 items-center">
                  <BsPencilFill />
                  <span>Edit Profile</span>
                </div>
              }
              color={"bg-color-1"}
              textcolor={"white"}
              handleClick={() => setShowModal(true)}
            />
          </div>
          <div className="w-full flex justify-around">
            <div className="w-1/2">
              <div className="w-48 mx-auto relative">
                <img
                  className="p-1 border-2 border-color-1 rounded-full w-48"
                  src={profileIcon}
                  alt="profile-icon"
                />
                <button className="absolute bottom-3 right-3 bg-color-1 rounded-full p-3 text-white shadow-md">
                  <BsPencilFill />
                </button>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-5 justify-around">
              <div className="flex gap-8">
                <label className="font-bold" htmlFor="name">
                  First Name:{" "}
                </label>
                <span id="name">{userState?.firstName}</span>
              </div>
              <div className="flex gap-8">
                <label className="font-bold" htmlFor="name">
                  Last Name:{" "}
                </label>
                <span id="name">{userState?.lastName}</span>
              </div>
              {/* <div className="flex gap-8">
                <label className="font-bold" htmlFor="email">
                  Email:{" "}
                </label>
                <span id="email">{userState?.email}</span>
              </div> */}
              <div className="flex gap-8">
                <label className="font-bold" htmlFor="name">
                  Mobile:{" "}
                </label>
                <span id="name">{userState?.mobile}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
