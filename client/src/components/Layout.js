import React, { useState } from "react";
import "../style/Layout.css";
import { AdminMenu, SidebarMenu, UserMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import Notificationpage from "../pages/Notificationpage";

function Layout({ children }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const logouthandler = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  // console.log(user.isDoctor);

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Doctors Here",
      path: "/home1",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  const SidebarMenu = user?.isAdmin
    ? AdminMenu
    : user?.isDoctor
    ? doctorMenu
    : UserMenu;

  return (
    <>
      <div className="main">
        <div className="layout" style={{ position: "relative" }}>
          {show && (
            <div className="sidebarsmall d-none" onClick={() => setShow(!show)}>
              <i
                className="fa-solid fa-bars"
                style={{ fontSize: "32px", color: "darkgray", padding: "10px" }}
              ></i>
              {show && (
                <div className="logo1" style={{ textAlign: "center" }}>
                  <h6>The Hope</h6>
                  <hr />
                </div>
              )}

              {show && (
                <div className="">
                  <div className="menu">
                    {SidebarMenu.map((menu, index) => {
                      const isactive = location.pathname === menu.path;
                      return (
                        <>
                          <div
                            key={index}
                            className={`menu-item ${isactive && "active"}`}
                          >
                            <i className={menu.icon}></i>
                            <Link to={menu.path}>{menu.name}</Link>
                          </div>
                        </>
                      );
                    })}
                    <div className="menu-item" onClick={logouthandler}>
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <Link to="/">Logout</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="sidebar">
            <div className="logo">
              <h6>The Hope</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu, index) => {
                const isactive = location.pathname === menu.path;
                return (
                  <>
                    <div
                      key={index}
                      className={`menu-item ${isactive && "active"}`}
                    >
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className="menu-item" onClick={logouthandler}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content h-screen overflow-y-scroll no-scrollbar">
            <div className="header">
              <div className="header-content">
                {show === false && (
                  <div className="barsmall " onClick={() => setShow(!show)}>
                    <i
                      className="fa-solid fa-bars"
                      style={{
                        fontSize: "32px",
                        // color: "red",
                        padding: "10px",
                      }}
                    ></i>
                  </div>
                )}
                <div className="headercontent2">
                  <Badge
                    count={user && user.notification.length}
                    onClick={() => {
                      navigate("/notification");
                    }}
                  >
                    <i
                      style={{
                        cursor: "pointer",
                        // display: "flex",
                        // flexWrap: "wrap",
                      }}
                      className="fa-solid fa-bell"
                    ></i>
                  </Badge>
                  <Link
                    to="/profile"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {user?.name}
                  </Link>
                </div>
              </div>
            </div>
            <div className="body overflow-y-scroll">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
