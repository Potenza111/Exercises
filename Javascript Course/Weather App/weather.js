class Weather {
  constructor(city, state) {
    this.apiKey = "03600455c9361b78f0e63cb14ebb759d";
    this.city = city;
    this.state = state;
  }

  // Fetch weather from APi
  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.apiKey}`
    );

    const responseData = await response.json();

    return responseData;
  }

  // Change Weather Location
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}
