import React, { useState } from "react";
import Navbar1 from "../components/Navbar1";
import { Form, Input, message } from "antd";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const ForgetPassword = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const navigate = useNavigate();

  const onfinishHandler = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/user/forget-password", values);

      if (res.data.success) {
        setLoading(false);
        message.success(res.data.message);
        navigate("/login");
      }
    } catch (e) {
      setLoading(false);
      message.error("Something went wrong");
      console.log(e);
    }
  };
  return (
    <div>
      <Navbar1 />

      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form card p-4"
        >
          <h3>Forget Password</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required placeholder="Enter your email" />
          </Form.Item>

          <button className="btn btn-primary" type="submit">
            {" "}
            {loading ? (
              <ClipLoader color={color} loading={loading} size={15} />
            ) : (
              "Send reset link"
            )}
          </button>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default ForgetPassword;
