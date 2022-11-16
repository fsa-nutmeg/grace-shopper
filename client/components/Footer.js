import React from "react";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";

export default function App() {
  return (
    <MDBFooter className="bg-dark text-white text-center">
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">About This</h5>

            <p>
              This is a model of our record store. We used React, Express,
              Bootstrap, Sequelize, RESTful APIs, Redux, Node.js, Bcrpyt, JWT,
              Webpack, Faker.js, and the LastFM API. Our store has Admin, logged
              in user, and guest user capabilities. We also offer a persistent
              cart so users can check back in with albums they were shopping
              for.
            </p>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Github</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-white">
                  https://github.com/seth-way
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  https://github.com/jalbaral
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  https://github.com/rileyjmack
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  https://github.com/ashton-griffin
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">LinkedIn</h5>

            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-white">
                  https://www.linkedin.com/in/sethway/
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  https://www.linkedin.com/in/jeff-albaral/
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  https://www.linkedin.com/in/riley-james-mack/
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  https://www.linkedin.com/in/ashton-griffin-/
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Copyright:
        <a className="text-white">High Rise Records</a>
      </div>
    </MDBFooter>
  );
}
