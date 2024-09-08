import React, { useState, useEffect, useRef } from "react";

import { Alert } from "react-bootstrap";

function DoctorsSuggestion() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const scrollRef = useRef(null);
  const contentRef = useRef(null);

  const alerts = [
    {
      variant: "primary",
      message:
        "Regular Exercise: Engage in physical activity for at least 30 minutes in a day like walking, running, or cycling.",
    },
    {
      variant: "warning",
      message: "Healthy Diet: Consume a balanced diet rich in fruits",
    },
    {
      variant: "secondary",
      message:
        "Adequate Hydration: Drink plenty of water throughout the day to stay hydrated",
    },
    {
      variant: "info",
      message: "Sufficient Sleep: Aim for 7-9 hours of quality sleep per night",
    },
    {
      variant: "dark",
      message:
        "Stress Management: Practice stress-reduction techniques such as meditation, deep breathing exercises, yoga, or spending time in nature",
    },
    {
      variant: "light",
      message:
        "Practice Good Hygiene: Follow good hygiene practices, including regular handwashing with soap and water, to prevent the spread of infections and illnesses.",
    },
  ];

  useEffect(() => {
    const element = scrollRef.current;
    const contentElement = contentRef.current;
    if (element && contentElement) {
      setScrollHeight(element.scrollHeight);
      setOffsetHeight(element.offsetHeight);
      const contentHeight = contentElement.offsetHeight;
      element.scrollTop = 0;
      setTimeout(() => {
        element.scrollTop = contentHeight / 2;
      }, 0);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const element = scrollRef.current;
      const contentElement = contentRef.current;
      if (element && contentElement) {
        const currentScrollTop = element.scrollTop;
        const contentHeight = contentElement.offsetHeight;
        if (currentScrollTop >= contentHeight - offsetHeight) {
          element.scrollTop = contentHeight / 2;
        } else {
          element.scrollTop += 1;
        }
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [scrollHeight, offsetHeight]);

  return (
    <div
      ref={scrollRef}
      style={{
        height: "300px",
        width: "full",
        overflowY: "auto",
        padding: "10px",
        // border: "1px solid #ccc",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <div ref={contentRef}>
        {alerts.map((alert, index) => (
          <Alert key={index} variant={alert.variant}>
            {alert.message}
          </Alert>
        ))}
        {alerts.map((alert, index) => (
          <Alert key={index + alerts.length} variant={alert.variant}>
            {alert.message}
          </Alert>
        ))}
      </div>
    </div>
  );
}

export default DoctorsSuggestion;
