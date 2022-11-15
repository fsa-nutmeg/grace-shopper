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
                src="https://i.discogs.com/5I1sHhyJ8DOW0tJKFzFXfuLrpQ1xDmDQCjjFA0n27kY/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTk0MTIz/ODMtMTY0NzI4NjA1/OS0zMzY3LmpwZWc.jpeg"
              />
            </div>
            <div key={2} className="carousel">
              <img
                className="imgCarousel"
                alt=""
                src="https://i.discogs.com/kNfYUBXYqME4lUL1xJ-UDET4z41wIuq_PZmKqE6R-ds/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMTM1/MjE2LTE2NTk3MTQy/MTktMzYzOS5qcGVn.jpeg"
              />
            </div>
            <div key={3} className="carousel">
              <img
                className="imgCarousel"
                alt=""
                src="https://i.discogs.com/magzKpYFpZOt3jBQlyxci_iMxndbvmmLOyydD90Xc9M/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQzNDc4/MDgtMTM2NTUzMzI1/Ny00MTMyLmpwZWc.jpeg"
              />
            </div>
            <div key={4} className="carousel">
              <img
                className="imgCarousel"
                alt=""
                src="https://i.discogs.com/KemiCJGxZFgdN8Xl7NcE6sluCpZIF-IpPAqsok3zkMU/rs:fit/g:sm/q:90/h:600/w:589/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU4MDU5/NjUtMTYzNzA4MDU3/My00MjU1LmpwZWc.jpeg"
              />
            </div>
            <div key={5} className="carousel">
              <img
                className="imgCarousel"
                alt=""
                src="https://i.discogs.com/hFeDXzjck0yisSqS_zFsociHFJrbBSZa7h-1C5dEvl4/rs:fit/g:sm/q:90/h:600/w:596/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNTg5/NTU0LTE1MDE3OTM3/NDgtNDE4OC5qcGVn.jpeg"
              />
            </div>
            <div key={6} className="carousel">
              <img
                className="imgCarousel"
                alt=""
                src="https://i.discogs.com/fuqdnfhlfcknjJ2BhWw1b2Y9d3Lo5AtFqeTQfGPjuRc/rs:fit/g:sm/q:90/h:537/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE5Njkz/OTMzLTE2Mjg5ODAx/NDItMjM2MC5qcGVn.jpeg"
              />
            </div>
          </Carousel>
        </div>
      </div>
    );
  }
}
export default ImgCarousel;
