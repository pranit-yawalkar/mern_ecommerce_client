import React, { useEffect } from "react";
import Meta from "../components/Meta";
import InputWidget from "../widgets/InputWidget";
import { Link, useNavigate } from "react-router-dom";
import ButtonWidget from "../widgets/ButtonWidget";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";

let registerSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string().email("Email should be valid").required("Email is required"),
  mobile: string().required("Mobile number is required"),
  password: string().required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  useEffect(() => {
    if (authState?.createdUser !== null && !authState?.isError) {
      navigate("/login");
    }
  }, [authState]);

  return (
    <>
      <Meta title="Login - ShoppingSpot" />
      <div className="bg-gray-100 px-4 md:py-8">
        <div className="max-w-[900px] w-full bg-white p-8 mx-auto flex flex-col md:flex-row">
          <h3 className="md:hidden text-2xl font-bold text-center mb-10">
            Register now
          </h3>
          <img
            src="illustrations/sign_up.gif"
            alt="register"
            className="w-full object-cover mx-auto md:w-1/3 md:m-5"
          />
          <div className="w-full md:w-2/3 my-5 md:mx-10">
            <h3 className="hidden md:block text-2xl font-bold text-center mb-10">
              Register now
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-5 md:px-8">
                <InputWidget
                  type="text"
                  placeholder="Enter your first name"
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
                <InputWidget
                  type="text"
                  placeholder="Enter your last name"
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
                      : ""
                  }
                />
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
                      : ""
                  }
                />
                <InputWidget
                  type="number"
                  placeholder="Enter your mobile number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  isError={
                    formik.touched.mobile && formik.errors.mobile ? true : false
                  }
                  errorMsg={
                    formik.touched.mobile && formik.errors.mobile
                      ? `${formik.errors.mobile}`
                      : ""
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
                      : ""
                  }
                />
              </div>
              <div className="md:px-8 my-5 w-full">
                <ButtonWidget
                  type={"submit"}
                  color="bg-color-1"
                  text="Register"
                  textcolor="white"
                  hovercolor="indigo-800"
                  width="w-full"
                />
              </div>
              <div className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-color-2 ml-auto my-2">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
