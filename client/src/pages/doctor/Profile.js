import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Image, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import { Button } from "react-bootstrap";

const Profile = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [image, setimage] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  // update doc ==========
  //handle form
  const handleFinish = async (values) => {
    const formdata = new FormData();
    formdata.append("id", user._id);
    formdata.append("firstName", values.firstName);
    formdata.append("lastName", values.lastName);
    formdata.append("email", values.email);
    formdata.append("phone", values.phone);
    formdata.append("address", values.address);
    formdata.append("specialization", values.specialization);
    formdata.append("experience", values.experience);
    formdata.append("fees", values.fees);
    formdata.append("website", values.website);
    formdata.append("timing", [
      moment(values.timing[0]).format("HH:mm"),
      moment(values.timing[1]).format("HH:mm"),
    ]);

    formdata.append("image", image);
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/doctor/updateProfile", formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      if (res.data.success) {
        message.success(res.data.message);
        // navigate("/home1");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  // update doc ==========

  // profile image

  const submitimage = async (values) => {
    // e.preventDefault();

    // const formData = new FormData();

    try {
      setLoading(true);
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          profileImage: image,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (res.data.success) {
        message.success(res.data.message);
        // navigate("/home1");
        console.log(res);
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };

  //getDOc Details
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Layout>
        <h1>Manage Profile</h1>
        {doctor && (
          <Form
            layout="vertical"
            onFinish={handleFinish}
            className="m-3"
            initialValues={{
              ...doctor,
              timing: [
                moment(doctor.timing[0], "HH:mm"),
                moment(doctor.timing[1], "HH:mm"),
              ],
            }}
          >
            <h4 className="">Personal Details : </h4>
            <Row gutter={20}>
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
                  label="Phone No"
                  name="phone"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your contact no" />
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
                <Form.Item label="Website" name="website">
                  <Input type="text" placeholder="your website" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your clinic address" />
                </Form.Item>
              </Col>
            </Row>
            <h4>Professional Details :</h4>
            <Row gutter={20}>
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
                  <Input type="text" placeholder="your experience" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Fees Per Cunsaltation"
                  name="fees"
                  required
                  rules={[{ required: true }]}
                >
                  <Input
                    type="text"
                    placeholder="Enter your fees per consultation"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Timings" name="timing" required>
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Image
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : doctor.profileImage
                      ? doctor.profileImage
                      : "Assets/avatar.webp"
                  }
                  rounded
                  height={100}
                  width={100}
                />

                <Input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setimage(e.target.files[0])}
                />
              </Col>
              <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary form-btn" type="submit">
                  {loading ? (
                    <ClipLoader color={color} loading={loading} size={25} />
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </Layout>
    </div>
  );
};

export default Profile;
