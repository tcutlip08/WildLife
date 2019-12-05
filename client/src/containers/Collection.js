import React, { Component } from "react";
import axios from "axios";
import CarDetails from "../components/CarDetails/CarDetails";
import SingleButton from "../components/SingleButton/SingleButton";

class Collection extends Component {
  state = {
    cars: []
  };

  componentDidMount() {
    this.getCars();
  }

  getCars = () => {
    axios
      .get("/api/cars")
      .then(cars => {
        console.log(cars);
        this.setState({ cars: cars.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container" style={{paddingTop: "2em"}}>
        {this.state.cars.map((car, i) => (
          <CarDetails {...car} key={car._id} button={<SingleButton _id={car._id} />}/>
        ))}
      </div>
    );
  }
}

export default Collection;
