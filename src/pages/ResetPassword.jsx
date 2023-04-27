import React from "react";
import Meta from "../components/Meta";
import InputWidget from "../widgets/InputWidget";
import ButtonWidget from "../widgets/ButtonWidget";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { resetPassword } from "../features/user/userSlice";

let resetPasswordSchema = object({
  password: string().required("Password is required"),
  confirmPassword: string().required("Password is required"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      dispatch(resetPassword({ token, password: values.password }));
      window.location.href = "/login";
    },
  });

  return (
    <>
      <Meta title="Reset Password" />
      <div className="bg-gray-100 px-2 md:py-24">
        <div className="max-w-[900px] w-full bg-white p-8 mx-auto flex flex-col md:flex-row md:items-center">
          <h3 className="md:hidden text-2xl font-bold text-center mb-10">
            Reset Password
          </h3>
          <img
            src="illustrations/reset_password.gif"
            alt="reset password"
            className="w-full mx-auto md:w-1/3 md:m-5"
          />
          <div className="w-full md:w-2/3 my-5 md:mx-10">
            <h3 className="hidden md:block text-2xl font-bold text-center mb-10">
              Reset Password
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-5 md:px-8">
                <InputWidget
                  type="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  isError={
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  }
                  errorMsg={
                    formik.touched.password && formik.errors.password
                      ? `${formik.errors.password}`
                      : "  "
                  }
                />
                <InputWidget
                  type="password"
                  placeholder="Confirm your new password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange("confirmPassword")}
                  onBlur={formik.handleBlur("confirmPassword")}
                  isError={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? true
                      : false
                  }
                  errorMsg={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? `${formik.errors.password}`
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

export default ResetPassword;
