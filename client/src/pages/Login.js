import React, { useState } from "react";
import "../style/register.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideloading } from "../redux/feature/alertSlice";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [glogin, setglogin] = useState(false);
  const [name, setname] = useState();

  const onfinishHandler = async (values) => {
    // console.log("login page", values);

    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      // console.log(res);
      dispatch(hideloading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        // message.success(res.data.message);

        setTimeout(() => {
          navigate("/home1");
          // window.location.reload();
        }, 100);
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      dispatch(hideloading());
      message.error(e.message);
    }
  };
  const onfinishHandler2 = async (values) => {
    console.log(values);
    try {
      const res = await axios.post("/api/v1/user/register", values);
      if (res.data.success || res.data.message === "User Already Exits") {
        onfinishHandler(values);
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      console.log("catch", e);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <Navbar1></Navbar1>

      <GoogleOAuthProvider clientId="495866975703-qakj5vj8m1ie220iadfjs21bltchdkhc.apps.googleusercontent.com">
        <div className="form-container">
          <Form
            layout="vertical"
            onFinish={onfinishHandler}
            className="register-form card p-4"
          >
            <h3>Login Form</h3>
            <Form.Item label="Email" name="email">
              <Input type="email" required placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input
                type="password"
                required
                placeholder="Enter your password"
              />
            </Form.Item>
            <p>
              {" "}
              Forget Password ?{" "}
              <Link to="/forgetPassword" className="text-decoration-none">
                Click here to reset
              </Link>
            </p>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
            {/* <GoogleLogin
              
              onSuccess={(credentialResponse) => {
                const decode = jwtDecode(credentialResponse.credential);
                setname(decode.name);
                const data = {
                  name: decode.name,
                  email: decode.email,
                  password: decode.sub,
                };
                setglogin(true);
                onfinishHandler2(data);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            /> */}
            <p className="mt-1">
              {" "}
              Dont have an account?{" "}
              <Link className="text-decoration-none" to="/register">
                Register here
              </Link>
            </p>
            <p>
              {" "}
              Account Not Verified ?{" "}
              <Link className="text-decoration-none" to="/authLink">
                Verify Account
              </Link>
            </p>
          </Form>
        </div>
      </GoogleOAuthProvider>
      <Footer />
    </>
  );
}

export default Login;
