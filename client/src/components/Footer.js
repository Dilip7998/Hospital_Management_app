import React from "react";

function Footer() {
  return (
    <>
      <div className=" bg-dark-subtle pt-5 ">
        <div className=" d-flex flex-wrap  text-black mb-5 justify-content-around   ">
          <div>
            <img src="Assets/logo.png" alt="The Hope " width="200" />
            <p
              style={{
                color: "white",
                // marginTop: "-15px",
                marginLeft: "20px",
                fontStyle: "italic",
              }}
            >
              Goal is to provide best treatment
            </p>
          </div>
          <div className="d-flex flex-wrap  justify-content-around  w-50  list-unstyled  ">
            <li>
              <span style={{ color: "gray", fontSize: "24px" }}>
                {" "}
                Contacts us :
              </span>
              <p>Email: Hope@gmail.com</p>
              <p>Address: 123 Street</p>
              <p>Phone: 0123456789</p>
            </li>
            <li>
              <span style={{ color: "gray", fontSize: "24px" }}>
                {" "}
                Services :
              </span>
              <p>24*7 Emergency Services</p>
              <p>Ambulance Available</p>
              <p>Blood Bank</p>
            </li>
            {/* <li>
              <span style={{ color: "gray", fontSize: "24px" }}>
                {" "}
                Contacts us :
              </span>
              <p>Email: Hope@gmail.com</p>
              <p>Address: 123 Street</p>
              <p>Phone: 0123456789</p>
            </li> */}
          </div>
        </div>
        <div className="text-center">@2024 All rights Reserved</div>
      </div>
    </>
  );
}

export default Footer;
