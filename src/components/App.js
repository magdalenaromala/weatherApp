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
   
    wind: "",
    clouds:"",
    err: false
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

 
  componentDidUpdate(prevProps, prevState) {
    // console.log("poprzedia wartość " + prevState.value);
    // console.log("aktualna wartość " + this.state.value);

    if (this.state.value.length < 3) return
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

      fetch(API)
        .then(response => {
          if (response.ok) {
            return response
          }
          throw Error("Nie udało się")
        })
        .then(response => response.json())
        .then(data => {
          const time = new Date().toLocaleString()
          this.setState(state => ({
            err: false,
            date: time,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            clouds :data.clouds.all,

            pressure: data.main.pressure,
            wind: data.wind.speed,
            city: state.value,

          }))
        })
        .catch(err => {
          console.log(err);
          this.setState(prevState => ({
            err: true,
            city: prevState.value
          }))
        })

    }

  }
  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
