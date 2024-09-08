import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Table, message, Image } from "antd";
import AddnewService from "../components/Services/AddnewService";
import axios from "axios";

const Services = () => {
  const [service, setService] = useState([]);

  const getallservices = async () => {
    try {
      const res = await axios.get("/api/v1/user/get-services");

      if (res.data.success) {
        setService(res.data.data);
        // console.log("res", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallservices();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(
        `/api/v1/admin/remove-service`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res.data);
      if (res.data.success) {
        getallservices();
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("error in removing service");
    }
  };
  const data = [
    {
      id: 1,
      name: "First",
      Desc: "loremskvnkjebve",
      image: "Assets/images.jpg",
    },
    {
      id: 2,
      name: "Second",
      Desc: "loremskvnkjebve",
      image: "Assets/img.jpg",
    },
  ];
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    // },

    {
      title: "Name",
      dataIndex: "serviceName",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Image",
      render: (text, record) => (
        <Image
          src={record.serviceImage}
          alt={record.serviceName}
          width="100"
          height={100}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <h1>Services List</h1>

        <Table
          columns={columns}
          dataSource={service}
          className=" overflow-auto"
        />
        <AddnewService />
      </Layout>
    </>
  );
};

export default Services;
