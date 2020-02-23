class UI {
  constructor() {
    this.location = document.getElementById("w-location");
    this.desc = document.getElementById("w-desc");
    this.string = document.getElementById("w-string");
    this.details = document.getElementById("w-details");
    this.icon = document.getElementById("w-icon");
    this.humidity = document.getElementById("w-humidity");
    this.mintemp = document.getElementById("w-mintemp");
    this.maxtemp = document.getElementById("w-maxtemp");
    this.wind = document.getElementById("w-wind");
  }

  paint(weather) {
    this.location.textContent = weather.name;
    this.desc.textContent = weather.weather[0].description;
    this.string.textContent = weather.main.temp;
    this.humidity.textContent = `Humidity ${weather.main.humidity}`;
    this.icon.setAttribute(
      "src",
      `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    );
    this.mintemp.textContent = `Min Temp ${weather.main.temp_min}`;
    this.maxtemp.textContent = `Max Temp ${weather.main.temp_max}`;
    this.wind.textContent = `Wind Speed ${weather.wind.speed}`;
  }
}
