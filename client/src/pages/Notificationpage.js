import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideloading } from "../redux/feature/alertSlice";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";

function Notificationpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const handlemarkallread = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      console.log(error);
      message.error("somthing went wrong");
    }
  };
  const handledelete = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      console.log(error);
      message.error("Somthing Went Wrong In Ntifications");
    }
  };
  return (
    <Layout>
      <h4 className="p-3 text-center">Notifcation page</h4>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end ">
            <h6
              className="p-2  "
              style={{ cursor: "pointer" }}
              onClick={handlemarkallread}
            >
              Mark All read
            </h6>
          </div>
          {user ? (
            user.notification?.map((notificationMgs) => (
              // <div className="card" style={{ cursor: "pointer" }}>
              //   <div
              //     className="card-text"
              //     onClick={() => navigate(notificationMgs.onClickPath)}
              //   ></div>
              // </div>

              <Alert
                key={notificationMgs._id}
                variant="danger"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </Alert>
            ))
          ) : (
            <p></p>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end ">
            <h6
              className="p-2  "
              style={{ cursor: "pointer" }}
              onClick={handledelete}
            >
              Delete All Read
            </h6>
          </div>
          {user ? (
            user.seennotification?.map((notificationMgs) => (
              // <div className="card" style={{ cursor: "pointer" }}>
              //   <div
              //     className="card-text"
              //     onClick={() => navigate(notificationMgs.onClickPath)}
              //   >
              //     {notificationMgs.message}
              //   </div>
              // </div>

              <Alert
                key={notificationMgs._id}
                variant="success"
                style={{ cursor: "pointer", color: "black" }}
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </Alert>
            ))
          ) : (
            <p></p>
          )}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notificationpage;
