const weatherApiKey = "d8a721fc13c95d47d690d471d17a9c18";
const unsplashAccessKey = "CyFmFekOFFNf-N3GYDAjmIfC3FL8NCLZOOsa94MlZvM";

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name.");

  fetchWeather(city);
  fetchForecast(city);
  setBackground(city);
}

// Weather
function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`)
    .then(res => res.json())
    .then(showWeather)
    .catch(() => alert("Error fetching weather"));
}

function showWeather(data) {
  const icon = data.weather[0].icon;
  const desc = data.weather[0].description;
  const temp = data.main.temp;
  const name = data.name;

  document.getElementById("weather").innerHTML = `
    <h2>${name}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
    <p>${desc}</p>
    <p>${temp}°C</p>
  `;
}

// Forecast
function fetchForecast(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric`)
    .then(res => res.json())
    .then(showForecast);
}

function showForecast(data) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "<h3>5-Day Forecast</h3>";

  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  daily.forEach(day => {
    const date = new Date(day.dt_txt).toDateString();
    const icon = day.weather[0].icon;
    const temp = day.main.temp;

    forecastDiv.innerHTML += `
      <div class="forecast-day">
        <p>${date}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" />
        <p>${temp}°C</p>
      </div>
    `;
  });
}

// Background Image
function setBackground(city) {
  fetch(`https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashAccessKey}`)
    .then(res => res.json())
    .then(data => {
      document.body.style.backgroundImage = `url(${data.urls.full})`;
    });
}

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("cityInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getWeatherByCity();
    }
  });

  const defaultCity = "Mangalore";
  fetchWeather(defaultCity);
  fetchForecast(defaultCity);
  setBackground(defaultCity);

});
