import axios from "axios";
import "./service.css";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

const Services = () => {
  const [service, setService] = useState([]);
  const getallservices = async () => {
    try {
      const res = await axios.get("/api/v1/user/get-services");

      if (res.data.success) {
        setService(res.data.data);
        console.log("res", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallservices();
  }, []);
  const carditems = [
    {
      id: 1,
      name: "first",
      img: "Assets/images.jpg",
    },
    {
      id: 2,
      name: "first",
      img: "Assets/images.jpg",
    },
    {
      id: 3,
      name: "first",
      img: "Assets/images.jpg",
    },
    {
      id: 4,
      name: "first",
      img: "Assets/images.jpg",
    },
    {
      id: 5,
      name: "first",
      img: "Assets/images.jpg",
    },
    {
      id: 6,
      name: "first",
      img: "Assets/images.jpg",
    },
    {
      id: 7,
      name: "first",
      img: "Assets/images.jpg",
    },
    {
      id: 8,
      name: "first",
      img: "Assets/images.jpg",
    },
  ];
  return (
    <>
      <div className="container mt-4">
        <h1 data-aos="fade-left" className="  m-2 ">
          Services Catalog
        </h1>
        <div
          className=" bg-dark rounded-4  "
          style={{ height: ".3rem", width: "10rem", marginLeft: ".5rem" }}
        ></div>
      </div>

      <div className="container d-flex flex-wrap justify-content-around  my-4  ">
        {service ? (
          service.map(({ id, serviceName, serviceImage }) => (
            <Card
              className="services"
              data-aos="fade-up"
              key={id}
              style={{
                width: "18rem",
                marginBlock: "1rem",
              }}
            >
              <Card.Img
                variant="top"
                className="serviceImage"
                src={serviceImage}
                height={250}
                style={{
                  objectFit: "cover",
                }}
              />
              <h1 className="serviceName">{serviceName}</h1>
            </Card>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default Services;
