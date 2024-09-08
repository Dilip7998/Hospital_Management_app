import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table } from "antd";
import { appointmentdetail } from "../Data/appointmentslip";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "Doctor",
      dataIndex: "doctorName",
    },

    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => <span>{record.date}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text, record) => <span>{record.time}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "approved" && (
            <button className="btn btn-success">Approved</button>
          )}
          {record.status === "pending" && (
            <button className="btn btn-warning">Pending</button>
          )}
          {record.status === "reject" && (
            <button className="btn btn-danger">Rejected</button>
          )}
          {record.status === "visited" && (
            <button className="btn btn-success">Visited</button>
          )}
        </div>
      ),
    },
    {
      title: "Reciept",
      dataIndex: "reciept",
      render: (text, record) => (
        <div className="d-flex">
          <button
            className="btn btn-success"
            onClick={(e) => {
              appointmentdetail({
                record: record,
                status: record.status,
              });
            }}
          >
            Download
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Appoinmtnets Lists</h1>
      <Table
        columns={columns}
        dataSource={appointments}
        className="overflow-x-auto"
      />
    </Layout>
  );
};

export default Appointments;
