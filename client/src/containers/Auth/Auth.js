import React, { Component } from "react";
import axios from "axios";

class Auth extends Component {
  state = {
    username: "",
    password: "",
    showLogin: true
  };

  componentDidMount() {
    if (this.props.isAuthed) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthed) {
      this.props.history.push("/dashboard");
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSignUp = event => {
    console.log("handle signup");
    event.preventDefault();
    axios
      .post("/api/register", this.state)
      .then(response => {
        console.log(response);
        if (response.data.error === false) {
          this.props.setIsAuthed(true);
        } else {
          alert("There was a problem!");
        }
      })
      .catch(err => {
        console.log(err);
        alert("There was a problem!");
      });
  };

  handleLogin = event => {
    console.log("handle login");
    event.preventDefault();
    axios
      .post("/api/auth", this.state)
      .then(response => {
        console.log(response);
        if (response.data.error === false) {
          this.props.setIsAuthed(true);
        } else {
          alert("There was a problem!");
        }
      })
      .catch(err => {
        console.log(err);
        alert("There was a problem!");
      });
  };

  toggleSignIn = () => {
    this.setState({
      newUser: !this.state.newUser
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group" style={{ textAlign: "center" }}>
                {this.state.showLogin ? (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={this.handleLogin}
                      style={{ width: "100%" }}
                    >
                      Login
                    </button>
                    <p onClick={this.toggleSignIn}>
                      Need to create an account?
                    </p>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={this.handleSignUp}
                      style={{ width: "100%" }}
                    >
                      Register
                    </button>
                    <p onClick={this.toggleSignIn}>Already a member?</p>
                  </>
                )}
              </div>
            </form>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    );
  }
}

export default Auth;
