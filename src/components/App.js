import React, { Component } from "react";
import Form from "./Form";
import Result from "./Result";
import "./App.css";

// Klucz do API
const APIKey = "eda12deaf7e86bb6d8f1e78fb9da554e";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    maine: "",
    description: "",
    icon: "",
    wind: "",
    err: false
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleCitySubmit = e => {
    e.preventDefault();
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${
      this.state.value
    }&APPID=${APIKey}&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("Nie udało się");
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
