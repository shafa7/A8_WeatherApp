const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");

const cityname = document.getElementById("cityname");
const temp = document.getElementById("temp");
const wind_speed = document.getElementById("wind_speed");
const description = document.getElementById("description");
const icon = document.getElementById("icon");

// Weather code mapping
function getWeatherInfo(code) {
  if (code === 0) return { text: "Clear Sky", icon: "☀️" };
  if (code <= 3) return { text: "Partly Cloudy", icon: "⛅" };
  if (code <= 48) return { text: "Fog", icon: "🌫" };
  if (code <= 67) return { text: "Rain", icon: "🌧" };
  if (code <= 77) return { text: "Snow", icon: "❄️" };
  if (code <= 99) return { text: "Thunderstorm", icon: "⛈" };
  return { text: "Unknown", icon: "❓" };
}

// Get weather using lat & lon
function getWeather(lat, lon, city) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
      const weather = data.current_weather;

      const info = getWeatherInfo(weather.weathercode);

      cityname.innerHTML = city;
      temp.innerHTML = weather.temperature + " °C";
      wind_speed.innerHTML = weather.windspeed + " km/h";
      description.innerHTML = info.text;
      icon.innerHTML = info.icon;
    })
    .catch(() => alert("Weather not found"));
}

// Convert city name → lat/lon
function getCityCoordinates(city) {
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
    .then(res => res.json())
    .then(data => {
      if (!data.results) {
        alert("City not found");
        return;
      }

      const lat = data.results[0].latitude;
      const lon = data.results[0].longitude;

      getWeather(lat, lon, city);
    })
    .catch(() => alert("Error finding city"));
}

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = cityInput.value;
  getCityCoordinates(city);
});

// Default city
getCityCoordinates("Delhi");
