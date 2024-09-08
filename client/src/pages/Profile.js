import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";

import { InputGroup, Col, Image, Row } from "react-bootstrap";
import { Button, Form, Input, message } from "antd";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";
// import { hideloading,  setLoading(true); } from "../redux/feature/alertSlice";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
  let [loading, setLoading] = useState(false);
  let [loading1, setLoading1] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [data, setdata] = useState(null);
  const getdetails = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getuserbyid",
        localStorage.getItem("id"),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        console.log("res", res.data.data);
        setdata(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleFinish = async (values) => {
    const formdata = new FormData();
    formdata.append("id", user._id);
    formdata.append("name", values.name);
    formdata.append("email", values.email);
    formdata.append("phone", values.phone);
    formdata.append("address", values.address);
    formdata.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post("/api/v1/user/updateProfile", formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        // console.log(res.data);
        setLoading(false);

        message.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      message.error(e.message);
    }

    // console.log(values);
  };

  // account delete
  const handleDelete = async () => {
    // console.log(user._id);

    try {
      handleClose();
      setLoading1(true);

      const res = await axios.post("/api/v1/user/deleteuser", user._id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        console.log(res.data);
        setLoading1(false);

        message.success(res.data.message);
        localStorage.clear();

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (e) {
      setLoading1(false);

      console.log(e);
      message.error(e.message);
      handleClose();
    }
  };
  useEffect(() => {
    // console.log("getdetails calling");
    getdetails();
  }, []);

  return (
    <div>
      <Layout>
        <h1>Profile</h1>

        {data && (
          <Form
            onFinish={handleFinish}
            initialValues={{
              ...data,
            }}
          >
            <Row>
              <Col xs={12} md={6}>
                <Image
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : data.profileImage
                      ? data.profileImage
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
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {/* <Button type="submit" onClick={handleFinish}>
                  Upload
                </Button> */}
              </Col>
            </Row>

            <Row style={{ marginTop: "20px" }}>
              <Col xs={12} md={6}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={12} md={6}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input type="text" disabled />
                </Form.Item>
              </Col>
              <Col xs={12} md={6}>
                <Form.Item
                  label="Phone No"
                  name="phone"
                  rules={[{ required: true }]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={12} md={6}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true }]}
                >
                  <Input type="text" />
                </Form.Item>
                <button className="btn btn-primary form-btn" type="submit">
                  {loading ? (
                    <ClipLoader color={color} loading={loading} size={25} />
                  ) : (
                    "Update "
                  )}
                </button>
              </Col>
            </Row>
          </Form>
        )}

        {/* <button onClick={getdetails}>Get details</button> */}

        <div className=" container d-flex justify-content-end ">
          <button className="btn btn-danger form-btn" onClick={handleShow}>
            {loading1 ? (
              <ClipLoader color={color} loading={loading1} size={25} />
            ) : (
              "Delete Account "
            )}
          </button>
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Warning !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete your account ?
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button className="btn btn-danger " onClick={handleDelete}>
                Delete
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
