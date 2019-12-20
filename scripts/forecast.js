class Forecast {
  constructor() {
    this.key = '025LUvvKCblzh64ln9ovnpXFqFJgdYVW';
    this.cityURI =
      'https://dataservice.accuweather.com/locations/v1/cities/search';
    this.weatherURI =
      'https://dataservice.accuweather.com/currentconditions/v1/';
  }
  async updateCity(city) {
    const cityDetails = await this.getCity(city),
      weather = await this.getWeather(cityDetails.Key);

    return { cityDetails, weather };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`,
      response = await fetch(this.cityURI + query),
      data = await response.json();

    return data[0];
  }
  async getWeather(locationKey) {
    const query = `${locationKey}?apikey=${this.key}`,
      response = await fetch(this.weatherURI + query),
      data = await response.json();

    return data[0];
  }
}
