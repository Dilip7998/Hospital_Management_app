import { Form, Image, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ClipLoader from "react-spinners/ClipLoader";
function MyVerticallyCenteredModal(props) {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [service, setService] = useState({
    serviceName: "",
    description: "",
  });
  const [serviceimage, setserviceimage] = useState(null);
  const addservices = async (e) => {
    // e.preventDefault();

    // console.log("image", serviceimage);
    const formdata = new FormData();
    formdata.append("serviceName", service.serviceName);
    formdata.append("description", service.description);
    formdata.append("serviceImage", serviceimage);
    console.log(formdata);
    // setserviceimage(null);
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/user/services", formdata);
      console.log("response", res);
      if (res.data.success) {
        message.success(res.data.message);
        // setserviceimage(null);
        setLoading(false);
        setTimeout(() => {
          props.onHide();
          window.location.reload();
        }, 500);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      message.error(e.message);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Service
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form layout="vertical" onFinish={addservices} className="m-3">
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Service Name"
              name="serviceName"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="Enter Service name"
                required
                onChange={(e) =>
                  setService({ ...service, serviceName: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Description"
              name="description"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="write description of service"
                required
                onChange={(e) =>
                  setService({ ...service, description: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Service Image"
              name="serviceImage"
              required
              rules={[{ required: true }]}
            >
              {serviceimage ? (
                <Image
                  src={URL.createObjectURL(serviceimage)}
                  height={100}
                  required
                  width={100}
                />
              ) : null}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setserviceimage(e.target.files[0])}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <button
              className="btn btn-primary form-btn"
              type="submit"
              //   onClick={props.onHide}
            >
              Add
            </button>
          </Col>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
const AddnewService = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        {loading ? (
          <ClipLoader color={color} loading={loading} size={25} />
        ) : (
          "Add new Service"
        )}
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AddnewService;
