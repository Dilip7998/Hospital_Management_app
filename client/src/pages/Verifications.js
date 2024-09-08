import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import FadeLoader from "react-spinners/FadeLoader";

const Verifications = () => {
  const params = useParams();
  const { token } = params;
  let [loading, setLoading] = useState(true);
  const [auth, setauth] = useState(true);

  const navigate = useNavigate();
  // setTimeout(async () => {
  //   try {
  //     const res = await axios.post("/api/v1/user/verify-account", {
  //       token,
  //     });
  //     console.log(res);
  //     if (res.status.success) {
  //       message.success(res.data.message);
  //       setLoading(false);
  //     } else if (res.data.success === false) {
  //       message.error(res.data.message);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     message.error("something went wrong ,please try again later");
  //     setLoading(false);
  //   }
  // }, 2000);
  const verifyUser = async () => {
    try {
      const res = await axios.post("/api/v1/user/verify-account", {
        token,
      });
      console.log(res);
      if (res.status === 201) {
        setTimeout(() => {
          message.success(res.data.message);
          setLoading(false);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }, 4000);
      }
      if (res.data.success === false) {
        setTimeout(() => {
          // message.error(res.data.message);
          setLoading(false);
          setauth(false);
          // setTimeout(() => {
          //   navigate("/login");
          // }, 3000);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong ,please try again later");
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  };
  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      {loading ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center "
          style={{ backgroundColor: "black", height: "100vh" }}
        >
          <p style={{ color: "white" }}>Verifying your account... </p>
          <FadeLoader color="#36d7b7" />
        </div>
      ) : auth ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center "
          style={{ backgroundColor: "black", height: "100vh" }}
        >
          <p className="mt-1 text-white">
            {" "}
            Redirecting to login page ....{" "}
            {/* <Link className="text-decoration-none" to="/login">
            click here
          </Link> */}
          </p>
        </div>
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center "
          style={{ backgroundColor: "black", height: "100vh" }}
        >
          <p className="mt-1 text-white">
            {" "}
            Authenticate failed ,{" "}
            <Link className="text-decoration-none" to="/authLink">
              click here
            </Link>{" "}
            to redirect auth page{" "}
          </p>
        </div>
      )}
    </>
  );
};

export default Verifications;
