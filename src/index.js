
let key = "a4192ff2aa563d8206c8f3fea1478ac5";

function timeConverter(unixTimestamp) {
  var a = new Date(unixTimestamp * 1000);
  var hour = a.getHours();
  var min = a.getMinutes();
  var day = a.getDay();

  if (min<10){
    min="0"+min;
  }
  var time = hour + ":" + min;
  return time;
}

function setImage(response) {
  let imgCurrent = document.getElementById("images-current");
  let currentWeather = response.data.weather[0].id;
  console.log(currentWeather);
  if (currentWeather <= 200 && currentWeather > 300) {
    imgCurrent.src = "src/images/rain.svg";
  } else {
    if (currentWeather <= 300 && currentWeather > 500) {
      imgCurrent.src = "src/images/rain.svg";
    } else {
      if (currentWeather <= 500 && currentWeather > 600) {
        imgCurrent.src = "src/images/snow.svg";
      } else {
        if (currentWeather === 800) {
          imgCurrent.src = "src/images/sun.svg";
        } else {
          imgCurrent.src = "src/images/rain.svg";
        }
      }
    }
  }
  console.log(imgCurrent.src);
}

function setDate() {
  let now = new Date();

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let day = days[now.getDay()];
  let dayTwo = days[now.getDay()+2]; 
  let dayThree = days[now.getDay+3]; 
  let dayFour =days[now.getDay+4];

  let hour = now.getHours();
  let minute = now.getMinutes();

  let today = document.querySelector("h2");
  today.innerHTML = `${day}, ${hour}:${minute}`;

  let twoDay = document.querySelector("#twoday");
  twoDay.innerHTML = dayTwo;

  let twoDay = document.querySelector("#threeday");
  twoDay.innerHTML = dayThree;

  let twoDay = document.querySelector("#fourday");
  twoDay.innerHTML = dayFour;

  let cityDefault = document.querySelector("#Default-City");
  cityDefault = cityDefault.innerHTML;
  let urlDefault = `https://api.openweathermap.org/data/2.5/weather?q=${cityDefault}&appid=${key}&units=metric`;
  // let urlDefaultForecast;
  // let urlDefaultHour;
  console.log(urlDefault);
  axios.get(urlDefault).then(setTemp);
  axios.get(urlDefault).then(setImage);
  // axios.get(urlDefaultForecast).then(setForecast);
  // axios.get(urlDefaultHour).then(setHour);
}

setDate();

function setHeader(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
}

function setTemp(response) {
  let tempMin = document.querySelector("#temperatureTodayMin");
  let tempMax = document.querySelector("#temperatureTodayMax");
  let weatherIcon = document.querySelector("#todayWeather");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  let humidity = document.querySelector("#humidity");

  tempMin.innerHTML = response.data.main.temp_min;
  tempMax.innerHTML = response.data.main.temp_max;
  weatherIcon.innerHTML = response.data.weather[0].main;
  sunrise.innerHTML = timeConverter(response.data.sys.sunrise);
  sunset.innerHTML = timeConverter(response.data.sys.sunset);
  humidity.innerHTML = `${response.data.main.humidity}%`;
}

// function setForecast() {}

// function setHour() {}

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-input");
  cityName = cityName.value;
  let urlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
  // let urlSearchForecast
  // let urlSearchHour
  console.log(cityName);
  console.log(urlSearch);
  axios.get(urlSearch).then(setHeader);
  axios.get(urlSearch).then(setTemp);
  axios.get(urlSearch).then(setImage);
  // axios.get(urlSeachForecast).then(setForecast);
  // axios.get(urlSearchHour).then(setHour);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(setLocation);
}

function setLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let lng = position.coords.longitude;
  let lt = position.coords.latitude;

  let urlLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${lt}&lon=${lng}&appid=${key}&units=metric`;
  // let urlLocForecast;
  // let urlLocHour;

  console.log(urlLoc);
  axios.get(urlLoc).then(setHeader);
  axios.get(urlLoc).then(setTemp);
  axios.get(urlLoc).then(setImage);
  // axios.get(urlLocForecast).then(setForecast);
  // axios.get(urlLocHour).then(setHour);
}

let locButton = document.querySelector("#location");
locButton.addEventListener("click", getLocation);

function cToF(event) {
  event.preventDefault();

  let unitMinCel = document.querySelector("#unitMin");
  unitMinCel = unitMinCel.innerHTML.trim();
  let unitCelTest = "°C";

  console.log(unitMinCel);
  console.log(unitCelTest);

  if (unitMinCel === unitCelTest) {
    var cTempMin = document.querySelector("#temperatureTodayMin").innerHTML;
    var cToFahrMin = (cTempMin * 9) / 5 + 32;
    document.querySelector("#temperatureTodayMin").innerHTML =
      Math.round(cToFahrMin * 100) / 100;

    console.log(cToFahrMin);

    var unitMin = document.querySelector("#unitMin");
    var unitFahr = "°F";
    unitMin.innerHTML = unitFahr;
    console.log(unitMin);

    var cTempMax = document.querySelector("#temperatureTodayMax").innerHTML;
    var cToFahrMax = (cTempMax * 9) / 5 + 32;
    document.querySelector("#temperatureTodayMax").innerHTML =
      Math.round(cToFahrMax * 100) / 100;

    console.log(cToFahrMax);

    var unitMax = document.querySelector("#unitMax");
    unitMax.innerHTML = unitFahr;
    console.log(unitMax);
  } else {
    alert("The displayed temperature is already in Fahrenheit");
  }
}

function fToC(event) {
  event.preventDefault();

  let unitMinFahr = document.querySelector("#unitMin");
  let unitFahr2 = "°F";

  console.log(unitMinFahr.innerHTML);
  console.log(unitFahr2);

  if (unitMinFahr.innerHTML === unitFahr2) {
    var fTempMin = document.querySelector("#temperatureTodayMin").innerHTML;
    var fToCelMin = ((fTempMin - 32) * 5) / 9;
    document.querySelector("#temperatureTodayMin").innerHTML =
      Math.round(fToCelMin * 100) / 100;

    console.log(fToCelMin);

    var unitMinF = document.querySelector("#unitMin");
    var unitCel = "°C";
    unitMinF.innerHTML = unitCel;
    console.log(unitMinF);

    var fTempMax = document.querySelector("#temperatureTodayMax").innerHTML;
    var fToCelMax = ((fTempMax - 32) * 5) / 9;
    document.querySelector("#temperatureTodayMax").innerHTML =
      Math.round(fToCelMax * 100) / 100;

    console.log(fToCelMax);

    var unitMaxF = document.querySelector("#unitMax");
    unitMaxF.innerHTML = unitCel;
    console.log(unitMaxF);
  } else {
    alert("The displayed temperature is already in Celsius");
  }
}

let cel = document.querySelector("#cel");
cel.addEventListener("click", fToC);

let fahr = document.querySelector("#fahr");
fahr.addEventListener("click", cToF);
