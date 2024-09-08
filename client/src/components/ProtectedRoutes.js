import React, { useEffect } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideloading, showLoading } from "../redux/feature/alertSlice";
import { setUser } from "../redux/feature/userSlice";

export default function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const getUser = async () => {
    try {
      dispatch(showLoading);
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading);
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to="/" />;
        localStorage.clear();
      }
    } catch (e) {
      // console.log(e);
      localStorage.clear();
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
