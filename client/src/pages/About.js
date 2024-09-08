import React, { useEffect, useState } from "react";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import Vision from "../components/about/Vision";
import axios from "axios";

const About = () => {
  const [doctors, setDoctors] = useState([]);

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

  return (
    <>
      <Navbar1 />
      <div
        className="about-page"
        style={{
          backgroundImage: `url("Assets/hop1.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="overlay"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            height: "100vh",
            width: "100%",
            display: "flex",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="text-center mt-5" style={{ color: "#fff" }}>
                  Our Vision
                </h1>
                <Vision />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-center mt-5">Our Teams</h2>

        <div className="container">
          {doctors?.map((doctor, index) => (
            <div
              key={doctor.id}
              className="card row  my-5 border-primary shadow-sm "
              style={{
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                minHeight: "300px",
              }}
            >
              <div className="col-md-6 mt-5">
                <img
                  src={doctor.profileImage || "default-doctor.jpg"} // Replace with actual image path
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                  style={{
                    height: "200px",
                    width: "200px",
                    marginTop: "10px",
                    objectFit: "cover",
                  }}
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="col-md-6 mt-5 ">
                <h3
                  style={{
                    color: index % 2 == 0 ? "Red" : "blue",
                  }}
                >
                  Dr. {doctor.firstName} {doctor.lastName}
                </h3>
                <h5>Specilization : {doctor.specialization}</h5>
                <h6>Experience : {doctor.experience} years</h6>
                <h6>About : {doctor.about}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
