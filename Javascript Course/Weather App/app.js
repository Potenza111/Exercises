const ui = new UI();
const storage = new Storage();

// Get Stored Location Data
const weatherLocation = storage.getLocationData();

// Init Weather obj
const weather = new Weather(weatherLocation.city, weatherLocation.state);

// Get Weather on DOM load
document.addEventListener("DOMContentLoaded", getWeather);

// Change Location Event
document.getElementById("w-change-btn").addEventListener("click", e => {
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;

  // Change Location
  weather.changeLocation(city, state);

  // setLocation Data
  storage.setLocationData(city, state);

  getWeather();

  // close model (jquery)
  $("#locModal").modal("hide");
});

function getWeather() {
  weather
    .getWeather()
    .then(results => {
      console.log(results);
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
