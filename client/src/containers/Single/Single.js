import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Single.css";
import CarDetails from "../../components/CarDetails/CarDetails";
import CollectionButton from "../../components/CollectionButton/CollectionButton";

class Single extends Component {
  state = {
    model: "",
    color: "",
    year: "",
    imageURL: "",
    _id: "",
    repaired: false,
    cost: "",
    showAccidentForm: false
  };

  componentDidMount() {
    this.getCarById();
  }

  getCarById = () => {
    axios
      .get("/api/cars/" + this.props.match.params.id)
      .then(car => {
        console.log(car);
        this.setState({
          model: car.data.data.model,
          color: car.data.data.color,
          year: car.data.data.year,
          imageURL: car.data.data.imageURL,
          _id: car.data.data._id,
          accident: car.data.data.accident
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteCarById = id => {
    let shouldDelete = window.confirm(
      "Are you sure you want to delete this tesla?"
    );
    if (shouldDelete === true) {
      axios
        .delete(`/api/cars/${id}`)
        .then(response => {
          console.log(response);
          alert("Your car was successfully deleted.");
          this.props.history.push("/collection");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  toggleRepaired = () => {
    console.log(this.state.repaired);
    let repaired = !this.state.repaired;
    this.setState({ repaired });
  };

  handleCostChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleAccidentFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    const accident = {
      repaired: this.state.repaired,
      cost: this.state.cost
    }
    axios.post(`/api/cars/${this.state._id}/accident/new`, accident)
    .then((response) => {
      console.log(response);
      this.setState({
        repaired: false,
        cost: "",
        showAccidentForm: false,
        model: response.data.data.model,
        color: response.data.data.color,
        year: response.data.data.year,
        imageURL: response.data.data.imageURL,
        _id: response.data.data._id,
        accident: response.data.data.accident
      });
    }).catch((err) => {
      console.log(err);
    })
  };

  render() {
    return (
      <div className="container" style={{paddingTop: "2em"}}>
        <CarDetails
          {...this.state}
          button={<CollectionButton />}
          deleteButton={true}
          deleteCarById={this.deleteCarById}
        />
        {this.state.showAccidentForm ? (
          <div className="row">
            <form>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="repaired"
                  name="repaired"
                  checked={this.state.repaired}
                  onChange={this.toggleRepaired}
                />
                <label className="custom-control-label" htmlFor="repaired">
                  Repaired?
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="cost">Cost </label>
                <input
                  type="text"
                  name="cost"
                  value={this.state.cost}
                  onChange={this.handleCostChange}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-dark"
                  onClick={this.handleAccidentFormSubmit}
                >
                  Submit Your Accident
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    this.setState({ showAccidentForm: false });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              this.setState({ showAccidentForm: true });
            }}
          >
            Report an Accident
          </button>
          <Link to={"/edit/" + this.state._id}>
              <button className="btn btn-secondary">Edit</button>
            </Link>
            </>
        )}
      </div>
    );
  }
}

export default Single;
