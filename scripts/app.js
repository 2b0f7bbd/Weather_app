const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

//update the UI according to data from API
const updateUI = data => {
  const { cityDetails, weather } = data;
  details.innerHTML = `
		<div>${cityDetails.EnglishName}</div>
		<div>${weather.WeatherText}</div>
		<div class="temp">
		<span>${weather.Temperature.Metric.Value}</span>
		<span>&deg;C</span>
		</div>`;
  if (card.classList.contains('hidden')) {
    card.classList.remove('hidden');
  }
  //set images
  let timeSrc = weather.IsDayTime ? `img/day.svg` : `img/night.svg`;
  time.setAttribute('src', timeSrc);

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
};

cityForm.addEventListener('submit', e => {
  //prevent default
  e.preventDefault();
  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();
  //update the UI with new city
  forecast
    .updateCity(city)
    .then(data => updateUI(data))
    .catch(error => console.log(error));

  //set local storage for city
  localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
  forecast
    .updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(error => console.log(error));
}
