import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import ButtonWidget from "../widgets/ButtonWidget";
import InputWidget from "../widgets/InputWidget";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

let loginSchema = object({
  email: string().email("Email should be valid").required("Email is required"),
  password: string().required("Password is required"),
});

const Login = () => {
  const authState = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState?.user !== null && !authState?.isError) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("insdie");
      dispatch(loginUser(values));
    },
  });
  return (
    <>
      <Meta title="Login - ShoppingSpot" />
      <div className="bg-gray-100 px-4 md:py-24">
        <div className="max-w-[900px] w-full bg-white p-8 mx-auto flex flex-col md:flex-row">
          <h3 className="md:hidden text-2xl font-bold text-center mb-10">
            Let's get started.
          </h3>
          <img
            src="illustrations/login.gif"
            alt="login"
            className="w-full mx-auto md:w-1/3 md:m-5"
          />
          <div className="w-full md:w-2/3 my-5 md:mx-10">
            <h3 className="hidden md:block text-2xl font-bold text-center mb-10">
              Let's get started.
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
              </div>
              <Link
                to="/forgot-password"
                className="text-color-2 block text-right text-sm md:px-10 my-2"
              >
                Forgot Password?
              </Link>
              <div className="md:px-8 my-5 w-full">
                <ButtonWidget
                  type={"submit"}
                  color="bg-color-1"
                  text="Login"
                  textcolor="white"
                  hovercolor="indigo-800"
                  width="w-full"
                />
              </div>
              <div className="text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-color-2 ml-auto my-2">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
