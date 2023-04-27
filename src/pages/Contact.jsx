import React from "react";
import { FaEnvelope, FaHome, FaInfo, FaPhone } from "react-icons/fa";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ButtonWidget from "../widgets/ButtonWidget";
import InputWidget from "../widgets/InputWidget";
import { number, object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";

let contactSchema = object({
  name: string().required("Name is required"),
  email: string().email("Email should be valid").required("Email is required"),
  mobile: number().required("Mobile Number is required"),
  comment: string().required("Comment is required"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(createQuery(values));
    },
  });
  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <div className="bg-gray-100 py-4">
        <div className="max-w-[1200px]  pb-10 md:pb-20 mx-auto flex flex-col-reverse md:flex-col gap-5">
          <div className="mx-auto w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24789.984227503905!2d72.8039316897797!3d18.969451703872117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce6e893065bd%3A0x9879ebcd3ef31652!2sMumbai%20Central!5e0!3m2!1sen!2sin!4v1679992035641!5m2!1sen!2sin"
              height="450"
              title="Shoppingsport"
              className="w-full max-w-[1200px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="bg-white rounded-lg px-5 py-2 my-2 w-full flex flex-col md:flex-row gap-8 shadow-sm mb-3">
            <div className="w-full md:w-1/2">
              <h3 className="m-2 text-xl font-bold">Contact Us</h3>
              <form onSubmit={formik.handleSubmit}>
                <div className="my-4">
                  <InputWidget
                    placeholder="Enter your name"
                    type="text"
                    name="name"
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    value={formik.values.name}
                    isError={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                    errorMsg={
                      formik.touched.name && formik.errors.name
                        ? `${formik.errors.name}`
                        : "  "
                    }
                  />
                </div>
                <div className="my-4">
                  <InputWidget
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
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
                <div className="my-4">
                  <InputWidget
                    placeholder="Enter your mobile number"
                    type="number"
                    name="mobile"
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    value={formik.values.mobile}
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
                <div className="my-4">
                  <textarea
                    name="comment"
                    id="comment"
                    placeholder="Enter your message"
                    className="outline-none border-2 w-full rounded-md px-2 py-1 text-black focus:border-2 focus:border-color-2"
                    cols="30"
                    rows="10"
                    onChange={formik.handleChange("comment")}
                    onBlur={formik.handleBlur("comment")}
                    value={formik.values.comment}
                  ></textarea>
                </div>
                <div className="w-full mb-5">
                  <ButtonWidget
                    color="bg-color-1"
                    text="Submit"
                    textcolor="white"
                    hovercolor="indigo-800"
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="m-2 text-xl font-bold">Get in touch with us</h3>
              <div className="my-5 flex flex-col gap-8">
                <div className="text-gray-500 flex items-center gap-3">
                  <FaHome />
                  <address className="not-italic">
                    ShoppingSpot, Marine drive road, Mumbai - 411111
                  </address>
                </div>
                <div className="text-gray-500 flex items-center gap-3">
                  <FaPhone />
                  <a href="tel:+91 9574833758">+91 9574833758</a>
                </div>
                <div className="text-gray-500 flex items-center gap-3">
                  <FaEnvelope />
                  <a href="mailto:store@shoppingspot.com">
                    store@shoppingspot.com
                  </a>
                </div>
                <div className="text-gray-500 flex items-center gap-3">
                  <FaInfo />
                  <p>Monday - Friday 9AM - 6PM.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
