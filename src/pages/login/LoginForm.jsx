import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faClose, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import googleLogo from "../../assets/search.svg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./LoginForm.css";

const LoginForm = ({ setCurrentStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  LoginForm.propTypes = {
    setCurrentStep: PropTypes.func.isRequired,
  };

  const navigate = useNavigate();

  const handleGoToRegister = () => {
    setCurrentStep(1);
    navigate("/");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
  });

  return (
    <div className="login-form">
      <ToastContainer />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setIsLoading(true);
          try {
            await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            navigate("/dashboard");
            toast.success("User Logged in Successfully!!");
            setSubmitting(false);
          } catch (error) {
            if (error.code === "auth/wrong-password") {
              toast.error("Incorrect password. Please try again.");
            } else if (error.code === "auth/user-not-found") {
              toast.error("User not found. Please check your email address.");
            } else if (error.code === "auth/invalid-email") {
              toast.error("Invalid email address. Please check your input.");
            } else if (error.code === "auth/invalid-credential") {
              toast.error("Invalid email or password. Please try again.");
            } else {
              toast.error("An error occurred. Please try again later.");
            }
            setSubmitting(false);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div className="header">
                <div className="auth-buttons">
                  <button
                    className="register-btn pb-3"
                    onClick={handleGoToRegister}
                  >
                    Register
                  </button>
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
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="social-icons"
                  />
                </button>
                <button className="social-btn google">
                  <img src={googleLogo} alt="" className="social-icons" />
                </button>
              </div>
              <p className="or-text">or register with email</p>

              <div className="form-group">
                <Field type="email" name="email" id="email" className="input" />
                <i htmlFor="email">Email address</i>
              </div>
              <div className="form-group pb-2">
                <div className="password-input">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="input"
                  />
                  <i htmlFor="password">Password</i>
                  <div className="password-icons">
                    <button type="button" onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="create-account-button"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? "Logging in...." : "Login to Dashboard"}
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
