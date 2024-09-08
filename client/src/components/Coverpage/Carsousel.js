import React from "react";
import Carousel from "react-bootstrap/Carousel";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import DoctorsSuggestion from "./doctorsSuggestion";

const Carsousel = () => {
  return (
    <div className="mt-0 d-flex flex-wrap flex-row justify-content-evenly    ">
      <div className="cars ">
        <Carousel indicators>
          <Carousel.Item>
            <img
              src="Assets/pic1.jpg"
              alt="image"
              height={340}
              className="d-block w-100 "
            />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="Assets/pic2.jpg"
              alt="image"
              height={340}
            />
            {/* <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>*/}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="Assets/pic3.jpg"
              alt="image"
              height={340}
            />
            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="Assets/pic4.jpg"
              alt="image"
              height={340}
            />
            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="Assets/hop1.jpg"
              alt="image"
              height={340}
            />
            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="listitem  mt-3  ">
        {/* <h2>Doctors Suggestions :</h2> */}
        <h3 className="text-center">Tips: To Stay Healthy</h3>

        <DoctorsSuggestion />

        {/* <ListGroup
          style={{ height: "340px" }}
          className=" overflow-y-scroll sideitem "
        >
          <Alert variant="primary">
            Regular Exercise: Engage in physical activity for at least 30
            minutes in a day like walking, running, or cycling.
          </Alert>
          <Alert variant="warning">
            Healthy Diet: Consume a balanced diet rich in fruits
          </Alert>
          <Alert variant="secondary">
            Adequate Hydration: Drink plenty of water throughout the day to stay
            hydrated
          </Alert>
          <Alert variant="info">
            Sufficient Sleep: Aim for 7-9 hours of quality sleep per nigh
          </Alert>
          <Alert variant="dark">
            Stress Management: Practice stress-reduction techniques such as
            meditation, deep breathing exercises, yoga, or spending time in
            nature
          </Alert>
          <Alert variant="light">
            Practice Good Hygiene: Follow good hygiene practices, including
            regular handwashing with soap and water, to prevent the spread of
            infections and illnesses.
          </Alert> */}
        {/* </ListGroup> */}
      </div>
    </div>
  );
};

export default Carsousel;
