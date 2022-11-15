//[X] build this component
import React from "react";
import { Carousel } from "react-carousel3";

export class ImgCarousel extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const style = {
      width: 297,
      height: 296,
    };
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #17a2b8 0%, #6e6d70 100%)",
        }}
      >
        <div className="carousel">
          <Carousel
            // height={460}
            // width={980}
            height={360}
            width={780}
            yOrigin={42}
            yRadius={48}
            autoPlay={true}
          >
            <div key={1} className="carousel">
              <img
                className="imgCarousel"
                alt=""
                src="https://www.udiscovermusic.com/wp-content/uploads/2015/10/Joy-Division-Unknown-Pleasures.jpg"
              />
            </div>
            <div key={2} className="carousel">
              <img
                className="imgCarousel"
                alt=""
                src="https://www.udiscovermusic.com/wp-content/uploads/2015/10/Joy-Division-Unknown-Pleasures.jpg"
              />
            </div>
            <div key={3} className="carousel">
              <img
                className="imgCarousel"
                alt=""
                src="https://www.udiscovermusic.com/wp-content/uploads/2015/10/Joy-Division-Unknown-Pleasures.jpg"
              />
            </div>
            <div key={4} className="carousel">
              <img
                className="imgCarousel"
                alt=""
                src="https://www.udiscovermusic.com/wp-content/uploads/2015/10/Joy-Division-Unknown-Pleasures.jpg"
              />
            </div>
            <div key={5} className="carousel">
              <img
                className="imgCarousel"
                alt=""
                src="https://www.udiscovermusic.com/wp-content/uploads/2015/10/Joy-Division-Unknown-Pleasures.jpg"
              />
            </div>
            <div key={6} className="carousel">
              <img
                className="imgCarousel"
                alt=""
                src="https://www.udiscovermusic.com/wp-content/uploads/2015/10/Joy-Division-Unknown-Pleasures.jpg"
              />
            </div>
          </Carousel>
        </div>
      </div>
    );
  }
}
export default ImgCarousel;
