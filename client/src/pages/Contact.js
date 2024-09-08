import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import ClipLoader from "react-spinners/ClipLoader";

function Contact() {
  const form = useRef();
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    formData.append("access_key", "32a53e1e-ce6f-4665-8ea7-8595369a0c2c");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    // console.log(json);

    try {
      setLoading(true);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());
      if (res.success) {
        toast.success("Message sent successfully!", {
          progressStyle: {
            background: "green",
          },
        });
        setLoading(false);
        form.current.reset();
      }
    } catch (e) {
      setLoading(false);
      toast.error("Failed to send message");
    }

    // console.log("Success", res);
  };

  return (
    <>
      <Navbar1></Navbar1>
      <div
        className="container-fluid min-vh-100  d-flex align-items-center "
        style={
          {
            // backgroundColor: "#c29bdc",
            // backgroundColor:
            //   "linear-gradient(90deg, rgba(76,131,232,0.9572649572649573) 0%, rgba(194,155,220,1) 100%, rgba(196,190,56,1) 100%)",
          }
        }
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <h2 className="text-center mb-4">Contact Us</h2>
              <form
                ref={form}
                onSubmit={onSubmit}
                className="p-4 bg-white shadow rounded"
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Reason for contacting us"
                    required
                    className="form-control"
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">
                    {loading ? (
                      <ClipLoader color={color} loading={loading} size={25} />
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <ToastContainer />
    </>
  );
}

export default Contact;
