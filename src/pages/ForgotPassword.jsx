import React from "react";
import Meta from "../components/Meta";
import { useNavigate } from "react-router-dom";
import ButtonWidget from "../widgets/ButtonWidget";
import InputWidget from "../widgets/InputWidget";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../features/user/userSlice";

let forgotPasswordSchema = object({
  email: string().email("Email should be valid").required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      dispatch(forgotPassword(values));
      formik.resetForm();
    },
  });

  return (
    <>
      <Meta title="Forgot Password" />
      <div className="bg-gray-100 px-2 md:py-24">
        <div className="max-w-[900px] w-full bg-white p-8 mx-auto flex flex-col md:flex-row md:items-center">
          <h3 className="md:hidden text-2xl font-bold text-center mb-10">
            Forgot Password?
          </h3>
          <img
            src="illustrations/reset_password.gif"
            alt="reset password"
            className="w-full mx-auto md:w-1/3 md:m-5"
          />
          <div className="w-full md:w-2/3 my-5 md:mx-10">
            <h3 className="hidden md:block text-2xl font-bold text-center mb-10">
              Forgot Password?
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-5 md:px-8">
                <InputWidget
                  type="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  isError={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  errorMsg={
                    formik.touched.email && formik.errors.email
                      ? `${formik.errors.email}`
                      : "  "
                  }
                />
              </div>
              <div className="md:px-8 my-8 w-full flex gap-3">
                <ButtonWidget
                  color="bg-color-7"
                  text="Cancel"
                  textcolor="black"
                  hovercolor="amber-700"
                  width="w-1/2"
                  handleClick={() => navigate("/login")}
                />
                <ButtonWidget
                  color="bg-color-1"
                  text="Submit"
                  textcolor="white"
                  hovercolor="indigo-800"
                  width="w-1/2"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
