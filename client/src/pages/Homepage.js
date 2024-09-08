import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DoctorList from "../components/DoctorList";
import { Row } from "antd";

function Homepage() {
  //login user data
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
        // console.log(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Doctors Available</h1>

      <div className="container">
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </div>
    </Layout>
  );
}

export default Homepage;
