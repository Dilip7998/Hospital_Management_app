import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import { Space } from "antd";

const Doctors = () => {
  const [Doctors, setDoctors] = useState([]);
  const [islogin, setlogin] = useState(false);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [filterdoctor, setFilterdoctor] = useState([]);

  useEffect(() => {
    const login = localStorage.getItem("token");
    if (login != null) {
      setlogin(true);
    } else {
      setlogin(false);
    }
  });

  const navigate = useNavigate();
  const connectwithdoctor = () => {
    if (islogin) {
      navigate("/home1");
    } else {
      alert("you are not login yet");
      navigate("/login");
    }
  };

  const getdoctors = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors");
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdoctors();
  }, []);

  const onSearch = (value) => {
    setSearchDoctor(value);
    const filteredDoctors = Doctors.filter((doctor) => {
      const name = doctor.firstName + " " + doctor.lastName;
      return name.toLowerCase().includes(value.toLowerCase());
    });
    setFilterdoctor(filteredDoctors);
  };

  return (
    <>
      <div data-aos="fade-right" className="container">
        <div className="d-flex flex-wrap flex-row justify-content-between m-2">
          {/* <h1 className="font-arial">Doctors Available</h1> */}
          <div className="ml-2">
            <input
              type="text"
              className="form-control py-2 px-3"
              placeholder="Search Doctors"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => onSearch(e.target.value)}
              value={searchDoctor}
            />
          </div>
        </div>
      </div>

      <div className="container  d-flex flex-wrap justify-content-around  my-4">
        {searchDoctor.length > 0 ? (
          filterdoctor.length > 0 ? (
            filterdoctor.map((doctor) => (
              <Card
                style={{ width: "18rem", marginBlock: "1rem" }}
                key={doctor._id}
                data-aos="fade-up"
              >
                <div
                  style={{
                    height: "230px",
                    backgroundColor: "#c3c8db",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={doctor.profileImage}
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
                <Card.Body>
                  <Card.Title>
                    Dr. {doctor.firstName} {doctor.lastName}
                  </Card.Title>
                  <Card.Text style={{ textTransform: "uppercase" }}>
                    {doctor.specialization}{" "}
                  </Card.Text>
                  <Card.Text>
                    {doctor.experience}+ years of experience
                  </Card.Text>
                  <Button variant="primary" onClick={connectwithdoctor}>
                    Get Appointment
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <h2 className="text-center font-arial mb-5 ">
              <Alert variant="danger">
                No doctor available with name {searchDoctor}
              </Alert>
            </h2>
          )
        ) : (
          Doctors.map((doctor) => (
            <Card
              style={{ width: "18rem", marginBlock: "1rem" }}
              key={doctor._id}
              data-aos="fade-up"
            >
              <div
                style={{
                  height: "230px",
                  backgroundColor: "#c3c8db",
                  borderRadius: "5px",
                }}
              >
                <img
                  src={doctor.profileImage}
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
              <Card.Body>
                <Card.Title>
                  Dr. {doctor.firstName} {doctor.lastName}
                </Card.Title>
                <Card.Text style={{ textTransform: "uppercase" }}>
                  {doctor.specialization}{" "}
                </Card.Text>
                <Card.Text>{doctor.experience}+ years of experience</Card.Text>
                <Button variant="primary" onClick={connectwithdoctor}>
                  Get Appointment
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </>
  );
};

export default Doctors;
