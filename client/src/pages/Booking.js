import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router";
import moment from "moment";
import { DatePicker, message, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideloading } from "../redux/feature/alertSlice";

import ClipLoader from "react-spinners/ClipLoader";
import Dayjs from "dayjs";
import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { loadStripe } from "@stripe/stripe-js";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function MyVerticallyCenteredModal(props) {
  const today = new Date().toISOString().split("T")[0];
  console.log(today);
  const [date1, setDate1] = useState("");
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      variant="primary"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Get Appointment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                autoFocus
                onChange={(e) =>
                  props.setAppointmentifo({
                    ...props.appointmentifo,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <div className="d-flex ">
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  id="Male"
                  autoFocus
                  className="me-3"
                  onChange={(e) =>
                    props.setAppointmentifo({
                      ...props.appointmentifo,
                      gender: e.target.id,
                    })
                  }
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  id="Female"
                  autoFocus
                  className="me-3"
                  onChange={(e) =>
                    props.setAppointmentifo({
                      ...props.appointmentifo,
                      gender: e.target.id,
                    })
                  }
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ex: 25"
                autoFocus
                onChange={(e) =>
                  props.setAppointmentifo({
                    ...props.appointmentifo,
                    age: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ex: 1234567890"
                autoFocus
                onChange={(e) =>
                  props.setAppointmentifo({
                    ...props.appointmentifo,
                    phone: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mr-3">Date</Form.Label>
              <Form.Control
                className="w-50"
                min={today}
                type="date"
                onChange={(e) =>
                  props.setAppointmentifo({
                    ...props.appointmentifo,
                    date: e.target.value,
                  })
                }
              />

              {/* <DatePicker
                aria-required={"true"}
                className=" w-100"
                format="DD-MM-YYYY"
                // defaultValue={date1}
                onChange={(e) => {
                  // console.log(value.format("DD-MM-YYYY"));
                  setDate1(e.format("DD-MM-YYYY"));
                  props.setAppointmentifo({
                    ...props.appointmentifo,
                    date: e.format("DD-MM-YYYY"),
                  });
                }}
              /> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) =>
                  props.setAppointmentifo({
                    ...props.appointmentifo,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Your Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Your Address"
                rows={3}
                onChange={(e) =>
                  props.setAppointmentifo({
                    ...props.appointmentifo,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>City</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter city name"
                className="w-50"
                rows={1}
                onChange={(e) =>
                  props.setAppointmentifo({
                    ...props.appointmentifo,
                    city: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                className="w-50"
                type="number"
                placeholder="Ex: 123456"
                rows={3}
                onChange={(e) =>
                  props.setAppointmentifo({
                    ...props.appointmentifo,
                    pincode: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={(e) => {
            e.preventDefault();

            // console.log(props.appointmentifo);
            props.handleBooking(e);

            // props.onHide();
          }}
        >
          {props.loading ? (
            <ClipLoader color={color} loading={props.loading} size={15} />
          ) : (
            "Book Appointment"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Booking = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [isAvailable, setIsAvailable] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [appointmentifo, setAppointmentifo] = useState({
    doctorId: params.doctorId,
    userId: user._id,
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    address: "",
    date: "",
    fee: "",
    city: "",
    pincode: "",
    time: "",
  });

  const getdoctorData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        console.log(res.data.data);
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAvailability = async (e) => {
    e.preventDefault();
    console.log(date, time);
    if (!date || !time) {
      return alert("Date & Time Required");
    }
    try {
      setLoading(true);

      // dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // dispatch(hideloading());
      setLoading(false);

      if (res.data.success) {
        // setLoading(false);
        setIsAvailable(true);
        // console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      // dispatch(hideloading());

      setLoading(false);
      console.log(error);
    }
  };
  const handleBooking = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // return;

    const stripe = await loadStripe(
      "pk_test_51OCOzNSIzGDexZEdY0YsCzY8JUsePhlAvp3DFAXEXZ6dvayY8yxBrBAzlO1UYqN3MwIGwvzx4xtS1QNFjkZ930F100O1qEdxYN"
    );

    try {
      // setIsAvailable(true);
      setLoading(true);
      // if (!date || !time) {
      //   return alert("Date & Time Required");

      // }
      // console.log(appointmentifo);
      appointmentifo.time = doctors.timing;

      appointmentifo.fee = doctors.fees;

      // console.log(appointmentifo);

      if (
        !appointmentifo.name ||
        !appointmentifo.email ||
        !appointmentifo.phone ||
        !appointmentifo.gender ||
        !appointmentifo.age ||
        !appointmentifo.address ||
        !appointmentifo.date
      ) {
        setLoading(false);
        return alert("fill the form completely");
      }
      // console.log(appointmentifo);
      // console.log(date);
      // if (!date) {
      //   return alert("Date Required");
      // }
      // dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          // fee: doctors.fee,

          ...appointmentifo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // dispatch(hideloading());
      if (res.data.success) {
        setTimeout(() => {
          // message.warning(res.data.message + "wait for payement");
          setModalShow(false);
        }, 2000);
        const body = {
          doctor: doctors._id,
          user: user._id,
          fee: doctors.fees,
          name: appointmentifo.name,
          email: appointmentifo.email,
          phone: appointmentifo.phone,
          date: appointmentifo.date,
          address: appointmentifo.address,
          city: appointmentifo.city,
          pincode: appointmentifo.pincode,
        };
        // console.log(body);

        const res1 = await axios.post("/api/v1/user/payment", body);
        // console.log(res1);
        const result = await stripe.redirectToCheckout({
          sessionId: res1.data.id,
        });
        if (result.error) {
          setLoading(false);
          // alert(result.error.message)
          console.log(result.error);
        }
      }
    } catch (error) {
      // dispatch(hideloading());
      message.error("Error in booking appointment, try again");
      setLoading(false);
      // console.log(error);
    }

    // console.log(appointmentifo);
  };

  useEffect(() => {
    getdoctorData();
  }, []);

  return (
    <>
      <Layout>
        <h3>Appointment Booking </h3>
        <div className="d-flex flex-row flex-wrap justify-content-start  ">
          <div>
            {doctors && (
              <Card
                style={{ width: "18rem", marginBlock: "1rem" }}
                key={doctors._id}
              >
                <div
                  style={{
                    height: "230px",
                    backgroundColor: "#c3c8db",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={doctors.profileImage}
                    alt="..."
                    className="mx-auto d-block rounded-circle"
                    style={{
                      height: "200px",
                      width: "200px",
                      marginTop: "10px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                {/* <Card.Img variant="top" src="logo192.png" /> */}
                <Card.Body>
                  <Card.Title>
                    Dr. {doctors.firstName} {doctors.lastName}
                  </Card.Title>
                  <Card.Text style={{ textTransform: "uppercase" }}>
                    {doctors.specialization}{" "}
                  </Card.Text>
                  <Card.Text>
                    {doctors.experience}+ years of experience
                  </Card.Text>
                  <Card.Text>Fees : {doctors.fees}</Card.Text>
                  <Card.Text>
                    {" "}
                    Timings : {doctors.timing &&
                      doctors.timing.split(",")[0]} -{" "}
                    {doctors.timing && doctors.timing.split(",")[1]}{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </div>
          <div>
            <div className="d-flex flex-column w-100 %   p-3">
              {/* <DatePicker
                aria-required={"true"}
                className=" w-100"
                format="DD-MM-YYYY"
                // defaultValue={date}
                onChange={(value) => {
                  // console.log(value.format("DD-MM-YYYY"));
                  setDate(value.format("DD-MM-YYYY"));
                  setAppointmentifo({
                    ...appointmentifo,
                    date: value.format("DD-MM-YYYY"),
                  });
                }}
              /> */}
              {/*
              <TimePicker
                aria-required={"true"}
                format="HH:mm"
                className="mt-3"
                defaultValue={time}
                onChange={(value) => {
                  // console.log(value.format("HH:mm"));
                  setTime(value.format("HH:mm"));
                  setAppointmentifo({
                    ...appointmentifo,
                    time: value.format("HH:mm"),
                  });
                }}
              />

              <button
                className="btn btn-primary mt-2"
                onClick={(e) => handleAvailability(e)}
              >
                {loading ? (
                  <ClipLoader color={color} loading={loading} size={25} />
                ) : (
                  "Check Availability"
                )}
              </button> */}
              <Button
                variant="dark"
                className="mt-2"
                onClick={(e) => {
                  // handleBooking(e);
                  setModalShow(true);
                }}
              >
                {loading ? (
                  <ClipLoader color={color} loading={loading} size={25} />
                ) : (
                  "Book Now"
                )}
              </Button>

              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setLoading={setLoading}
                loading={loading}
                setAppointmentifo={setAppointmentifo}
                appointmentifo={appointmentifo}
                handleBooking={handleBooking}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Booking;
