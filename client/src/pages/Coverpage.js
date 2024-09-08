import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import Carsousel from "../components/Coverpage/Carsousel";
import Services from "../components/Coverpage/Services";
import Doctors from "../components/Coverpage/Doctors";
// import image from "../Assets";
import AOS from "aos";
import "aos/dist/aos.css";

function Coverpage() {
  useEffect(() => {
    AOS.init({
      offset: 160,
      duration: 1000,
    });
  }, []);
  return (
    <>
      <Navbar1 />
      <div className="container">
        <Carsousel />
      </div>
      <Doctors />
      <Services />

      <Footer />
    </>
  );
}

export default Coverpage;
