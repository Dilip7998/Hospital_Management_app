import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";

import axios from "axios";

import moment from "moment";
import { message, Table } from "antd";
import { appointmentdetail } from "../../Data/appointmentslip";

const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        console.log(res.data.data);
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "name",
    },
    {
      title: "Date ",
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
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => {
                  handleStatus(record, "approved");

                  setTimeout(() => {
                    appointmentdetail({
                      record: record,
                      status: "approved",
                      id: true,
                    });
                  }, 2000);
                }}
              >
                Approved
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => {
                  handleStatus(record, "rejected");
                  setTimeout(() => {
                    appointmentdetail({
                      record: record,
                      status: "rejected",
                      id: true,
                    });
                  }, 2000);
                }}
              >
                Reject
              </button>
            </div>
          )}
          {/* {record.status === "approved" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                // onClick={() => handleStatus(record, "visited")}
              >
                Visited
              </button>
            </div>
          )} */}
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

export default DoctorAppointment;
