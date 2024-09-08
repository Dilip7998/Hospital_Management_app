import React, { useState, useEffect, useRef } from "react";

const Test = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const scrollRef = useRef(null);
  const contentRef = useRef(null);

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
        height: "200px",
        overflowY: "auto",
        padding: "10px",
        border: "1px solid #ccc",
      }}
    >
      <div ref={contentRef}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <p key={item}>{item}</p>
        ))}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <p key={item + 10}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Test;
