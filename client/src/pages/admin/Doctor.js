import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Image, Table, message } from "antd";
import axios from "axios";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const getdoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
        console.log("doctors", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdoctors();
  }, []);

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const removeDoctor = async (record) => {
    try {
      const res = await axios.post("/api/v1/admin/removedoctor", record);
      if (res.data.success) {
        getdoctors();
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      render: (text, record) => <span>{record.specialization}</span>,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-warning ">Pending</button>
          ) : (
            <button className="btn btn-success ">Approved</button>
          )}
        </div>
      ),
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Profile Image",
      render: (text, record) => (
        <Image
          src={record.profileImage}
          // alt={record.profileImage}
          rounded
          width={100}
          height={100}
          style={{ borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "About",
      render: (text, record) => <p>{record.about}</p>,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <div className="d-flex flex-wrap ">
              <button
                className="btn btn-success m-1"
                onClick={() => {
                  handleAccountStatus(record, "approved");
                }}
              >
                Approve
              </button>
              <button
                className="btn btn-danger m-1"
                onClick={() => {
                  handleAccountStatus(record, "rejected");
                }}
              >
                Reject
              </button>
            </div>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => removeDoctor(record)}
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Layout>
        <h1 className="text-center">Doctors List</h1>
        <Table
          columns={columns}
          dataSource={doctors}
          className="overflow-x-auto"
        ></Table>

        {/* <img src="../doctors\1709578620214images.jpeg" alt="" /> */}
      </Layout>
    </div>
  );
};

export default Doctor;
