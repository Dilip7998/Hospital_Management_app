import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Form, Image, Input, Row, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";

import moment from "moment";
function ApplyDoctor() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [image, setimage] = useState(null);
  const handleFinish = async (values) => {
    console.log("values", values);

    console.log(values.timing);
    const date = new Date(values.timing[0]);
    const date1 = new Date(values.timing[1]);
    // console.log(
    //   date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    // );

    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("firstName", values.firstName);
    formdata.append("lastName", values.lastName);
    formdata.append("email", values.email);
    formdata.append("phone", values.phone);
    formdata.append("specialization", values.specialization);
    formdata.append("address", values.address);
    formdata.append("experience", values.experience);
    formdata.append("fees", values.fees);
    formdata.append("website", values.website);
    formdata.append("timing", [
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date1.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      // moment(values.timing[0]).format("HH:mm"),
      // moment(values.timing[1]).format("HH:mm"),
    ]);
    formdata.append("about", values.about);
    formdata.append("userId", user._id);
    console.log("formdata", formdata);

    try {
      setLoading(true);
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        formdata,
        // {
        //   ...values,
        //   userId: user._id,
        //   timing: [
        //     moment(values.timing[0]).format("HH:mm"),
        //     moment(values.timing[1]).format("HH:mm"),
        //   ],
        // },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (res.data.success) {
        message.success(res.data.message);
        // console.log(res.data);

        // navigate("/home1");
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      message.error("Something Went Wrong");
    }
  };
  return (
    <div>
      <Layout>
        <h1 className="text-center">Apply doctors</h1>
        <Form layout="vertical" onFinish={handleFinish} className="m-3">
          <h4 className="">Personal Details :</h4>
          <Row gutter={10}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Mobile No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="your phone number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Website"
                name="website"
                // required
                // rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your website " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Proffessional Details :</h4>
          <Row gutter={10}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="enter your experience" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label=" Consulatant Fees"
                name="fees"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder=" Consulatant fees" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timings" name="timing" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Describe yourself" name={"about"} required>
                <Input
                  type="text"
                  placeholder="Ex: Achievments, Experience, etc"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Profile" name="profileImage" required>
                <Image
                  src={
                    image ? URL.createObjectURL(image) : "Assets/avatar.webp"
                  }
                  rounded
                  height={100}
                  width={100}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setimage(e.target.files[0])}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                {loading ? (
                  <ClipLoader color={color} loading={loading} size={25} />
                ) : (
                  "Submit"
                )}
              </button>
            </Col>
          </Row>
        </Form>
      </Layout>
    </div>
  );
}

export default ApplyDoctor;
