import React, { useState } from "react";
import Navbar1 from "../components/Navbar1";
import { Form, Input, message } from "antd";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

const AuthLink = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const navigate = useNavigate();
  const onfinishHandler = async (values) => {
    // console.log(values);
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/user/auth-link", values);

      if (res.data.success) {
        setLoading(false);
        message.success(res.data.message);
        navigate("/login");
      }
      if (res.data.success === false) {
        setLoading(false);
        message.error(res.data.message);
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
          <h3>Verify your email</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required placeholder="Enter your email" />
          </Form.Item>

          <button className="btn btn-primary" type="submit">
            {loading ? (
              <ClipLoader color={color} loading={loading} size={25} />
            ) : (
              "Auth Link Send"
            )}
          </button>
          <p className="mt-1">
            {" "}
            Back to login page !{" "}
            <Link className="text-decoration-none" to="/login">
              Click here
            </Link>
          </p>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLink;
