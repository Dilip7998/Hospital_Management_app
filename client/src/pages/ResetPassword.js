import { React, useState } from "react";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import { Form, Input, message } from "antd";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
// import { useState } from "react";

const ResetPassword = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const navigate = useNavigate();

  const param = useParams();
  const { token } = param;
  console.log("token", token);
  const onfinishHandler = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/user/reset-password", {
        token,
        password: values.password,
      });
      if (res.data.success) {
        setLoading(false);
        // console.log(res.data.message);
        message.success(res.data.message);
        navigate("/login");
      } else {
        setLoading(false);
        if (res.data.status === 400) {
          message.error(res.data.message);
        }
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      message.error("Something went wrong");
    }
  };

  return (
    <div>
      <Navbar1 />
      <div className="form-container">
        {/* <h2>{token}</h2> */}
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form card p-4"
        >
          <h3>Reset Password</h3>
          <Form.Item label="New Password" name="password">
            <Input
              type="password"
              required
              placeholder="Enter your new password"
            />
          </Form.Item>

          <button className="btn btn-primary" type="submit">
            {loading ? (
              <ClipLoader color={color} loading={loading} size={25} />
            ) : (
              "Update Password"
            )}
          </button>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
