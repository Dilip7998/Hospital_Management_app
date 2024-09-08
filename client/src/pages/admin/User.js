import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Image, Table, message } from "antd";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (record) => {
    console.log(record);
    try {
      const res = await axios.post("/api/v1/admin/deleteUser", record, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        getUsers();
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Is Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
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
          alt="No image "
          style={{ borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(record)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Layout>
        <h1 className="text-center">Users list</h1>
        <Table
          columns={columns}
          dataSource={users}
          className="overflow-x-auto"
        ></Table>
      </Layout>
    </div>
  );
};

export default User;
