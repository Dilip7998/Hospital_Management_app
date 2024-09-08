import React from "react";
import "../style/register.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { hideloading, showLoading } from "../redux/feature/alertSlice";

import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onfinishHandler = async (values) => {
    // console.log(values);

    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideloading());
      if (res.data.success) {
        // message.success("Register Successfully");
        message.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      dispatch(hideloading());
      console.log("catch", e);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <Navbar1 />
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form card p-4"
        >
          <h3>Registration Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required placeholder="Enter your password" />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Register
          </button>

          <p className="mt-1">
            {" "}
            Already Registered ?{" "}
            <Link className="text-decoration-none" to="/login">
              click here to login
            </Link>
          </p>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default Register;
