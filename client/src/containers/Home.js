import React, { Component } from "react";
import { Link } from "react-router-dom";
import Main from "../assets/main-hero-desktop.jpg";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div
          className="jumbotron"
          style={{ textAlign: "center", margin: "auto" }}
        >
          WWWIIILLLDDD LLLIIIFFFEEE
        </div>

        <div className="row" style={{ paddingTop: "2em" }}>
          <div className="col"></div>
          <div className="col" style={{ textAlign: "center", margin: "auto" }}>
            <Link to="/collection">
              <button className="btn btn-secondary">Hi I'm a button</button>
            </Link>
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

export default Home;
