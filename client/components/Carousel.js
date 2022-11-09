//[X] build this component
import React from "react";
import { Carousel } from "react-carousel3";

const style = {
  width: 297,
  height: 296,
};

export default () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      background: "linear-gradient(to bottom, #16235e 0%, #020223 100%)",
    }}
  >
    <Carousel
      // height={460}
      // width={980}
      height={460}
      width={980}
      yOrigin={42}
      yRadius={48}
      autoPlay={true}
    >
      <div key={1} style={style}>
        <img alt="" src="public/test-art/!Lateralus.png" />
      </div>
      <div key={2} style={style}>
        <img alt="" src="public/test-art/Death of a Bachelor.png" />
      </div>
      <div key={3} style={style}>
        <img alt="" src="public/test-art/SATURATION II.png" />
      </div>
      <div key={4} style={style}>
        <img alt="" src="public/test-art/Scan 1.jpg" />
      </div>
      <div key={5} style={style}>
        <img alt="" src="public/test-art/Scan 853.jpg" />
      </div>
      <div key={6} style={style}>
        <img alt="" src="public/test-art/Scan 0.jpg" />
      </div>
    </Carousel>
  </div>
);
