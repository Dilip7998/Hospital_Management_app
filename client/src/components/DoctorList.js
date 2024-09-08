import React from "react";
import { useNavigate } from "react-router";

const DoctorList = ({ doctor }) => {
  // console.log(doctor);
  const navigate = useNavigate();
  // console.log("doctor", doctor.timing[0]);

  const timing = doctor.timing.split(",");
  // console.log("timing", timing[0]);
  return (
    <>
      <div
        className="card m-2 mb-5 "
        style={{ cursor: "pointer", minWidth: "" }}
        onClick={() => navigate(`/doctor/booking/${doctor._id}`)}
      >
        <div className="card-header " style={{ fontSize: "20px" }}>
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Cunsaltation</b> {doctor.fees}
          </p>
          <p>
            <b>Timings</b> {doctor.timing.split(",")[0]} -{" "}
            {doctor.timing.split(",")[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
