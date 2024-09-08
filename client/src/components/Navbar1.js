import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";

function Navbar1() {
  const { user } = useSelector((state) => state.user);
  const usericon = user?.name.match(/ (?=\w).|^\w/g).join("");
  const [login, setlogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setlogin(true);
    }
  }, []);
  const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="Assets/logo.png"
            alt=""
            style={{
              width: "150px",
              height: "50px",
              cursor: "pointer",
              objectFit: "contain",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ fontSize: "20px" }}
        >
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            {login ? (
              <Nav.Link href="/home1">
                {" "}
                {/* <Avatar
                  style={{
                    backgroundColor: "#87d068",
                    width: "40px",
                    height: "40px",
                  }}
                
                /> */}
                <a
                  href="/home1"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "26px",
                    textDecoration: "none",
                    // backgroundColor: "#87d068",
                    // padding: "10px",
                    // borderRadius: "50px",
                  }}
                >
                  {usericon}
                </a>
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                <button className="btn btn-primary">Login</button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;
