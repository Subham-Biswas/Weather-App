let weather = {
  apiKey: "8a03c7979b1c483397172808242806",
  fetchWeather: function (city) {
    fetch(
      "https://api.weatherapi.com/v1/current.json?key=" +
        this.apiKey +
        "&q=" +
        city
    )
      .then((res) => res.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data.location;
    const { icon, text } = data.current.condition;
    const { temp_c, humidity, wind_kph, feelslike_c } = data.current;
    console.log(name, icon, text, temp_c, humidity, wind_kph);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".temp").innerText = temp_c + "°C";
    document.querySelector(".description").innerText = text;
    document.querySelector(".icon").src = icon;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + wind_kph + "km/h";
    document.querySelector(".feels-like").innerText =
      "Feels Like: " + feelslike_c + "°C";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search-button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Kolkata");
