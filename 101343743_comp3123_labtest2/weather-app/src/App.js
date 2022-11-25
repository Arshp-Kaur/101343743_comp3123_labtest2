import React, { useState } from "react";
import { render } from "react-dom";
import axios from "axios";

const WeatherApp = () => {
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("Toronto");
  const [country, setCountry] = useState("Canada");

  const getResult = (city, country) => {
    axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=c34ec9803070432af9fb532e60e01083`,
    })
      .then((response) => {
        console.log(response.data.main.temp);
       
        setTemperature(response.data.main.temp - 273.15);
       
        setDesc(response.data.weather[0].main);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex", justifyContent: "center", alignItems: "center", height: "70px", width: "100%", backgroundColor: "white",
        }}
      >
        Weather
      </div>
      {<div
        style={{ height: "5px", width: "100%", backgroundColor: "white" }}
      ></div>}
      <br />
      <div style={{ marginLeft: "37%" }}>
        <div
          style={{
            height: "150px", width: "450px", backgroundColor: "blue", justifyContent: "center", alignItems: "center",
            fontSize: "25px",
          }}
        >
          {new Date().toLocaleString()}
          <br />
          {city} Weather
          <br />          
          {Math.round(temperature * 100) / 100} ℃ - {desc}
        </div>
        <br />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
          onClick={() => {
            getResult(city, country);
          }}
        >
          GET
        </button>
      </div>
    </>
  );
};

render(<WeatherApp />, document.querySelector("#root"));

export default WeatherApp;