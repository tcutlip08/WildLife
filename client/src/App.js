import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./containers/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Auth from "./containers/Auth/Auth";

function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const localStorageIsAuthed = localStorage.getItem("isAuthed");
    if (localStorageIsAuthed) {
      storeIsAuthed(localStorageIsAuthed);
    }
  }, []);

  const toggleIsAuthed = () => {
    setIsAuthed(!isAuthed);
  };

  const storeIsAuthed = incomingValue => {
    localStorage.setItem("isAuthed", incomingValue);
    setIsAuthed(incomingValue);
  };

  return (
    <Router>
      <NavBar isAuthed={isAuthed} setIsAuthed={storeIsAuthed} />
      <button onClick={toggleIsAuthed}>Toggle isAuthed</button>
      <Switch>
        <Route
          path="/auth"
          component={props => (
            <Auth {...props} isAuthed={isAuthed} setIsAuthed={storeIsAuthed} />
          )}
        />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
