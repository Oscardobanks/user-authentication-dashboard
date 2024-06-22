import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import {
  faClose,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import googleLogo from "../../assets/search.svg";

import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleGoToRegister = () => {
    navigate('/');
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
  });

  return (
    <div className="login-form">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission logic here
          console.log("Form values:", values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
                <div className="header">
              <div className="auth-buttons">
                <button className="register-btn pb-3" onClick={handleGoToRegister}>Register</button>
                <button className="login-btn pb-3">Log in</button>
              </div>
              <button className="close-btn pb-3 text-xl">
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <div className="social-login">
              <button className="social-btn apple">
                <FontAwesomeIcon icon={faApple} className="social-icons" />
              </button>
              <button className="social-btn facebook">
                <FontAwesomeIcon icon={faFacebookF} className="social-icons" />
              </button>
              <button className="social-btn google">
                <img src={googleLogo} alt="" className="social-icons" />
              </button>
            </div>
            <p className="or-text">or register with email</p>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <Field type="email" name="email" id="email" />
            </div>
            <div className="form-group pb-2">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                />
                <div className="password-icons">
                  <button type="button" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="create-account-button"
              disabled={isSubmitting}
            >
              Login to Dashboard
            </button>
            <div className="checkbox-group">
              <Field type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
              </div>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;