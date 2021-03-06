
 function formatDate(timestamp)  {
   let date = new Date(timestamp);
   
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
   let day = days[date.getDay()];
   let currentDate = date.getDate();
   let currentMonth = months[date.getMonth()];
   
return `${day}, ${currentDate} ${currentMonth} - ${formatHours(timestamp)}`;
 }   

function formatHours(timestamp) {
  let date = new Date(timestamp);
   let hours = date.getHours();
   let minutes = date.getMinutes();
   if (minutes < 10) {
     minutes = `0${minutes}`;
   } 

if (hours < 10) {hours = `0${hours}`; 
}
return `${hours}:${minutes}`;
}

function displayCurrentWeather(response) {
  
  
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
   
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);

    document.querySelector("#icon").setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 icon.setAttribute("alt", response.data.weather[0].description);

 celsiusTemperature = response.data.main.temp;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  
  forecastElement.innerHTML = null;
  let forecast = null;
  

  for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  
  forecastElement.innerHTML += `
 
  <div class="col-2">
  <h3>
  ${formatHours(forecast.dt * 1000)}
  </h3>
  <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="">
  <div class="weather-forecast-temperature"><strong>
${Math.round(forecast.main.temp_max)}??
</strong> 
${Math.round(forecast.main.temp_min)}??

</div>
</div>`;
  }
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "5fb029ebc3ad09cdda11508274bae55c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
  
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}




function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature)



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);



searchCity("Dublin");