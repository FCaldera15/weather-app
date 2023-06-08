// Creating elements
const APIkey = "2094e670d6bacf45e0476b19709a6bb9";
var searchbtn = document.querySelector("#search-button");
var userInput = document.querySelector("#user-search-input");
var recentSearch = document.querySelector("#recent-search");
var cityName = document.querySelector(".cityName");
var temp = document.querySelector(".temp");
var wind = document.querySelector(".wind");
var humidity = document.querySelector(".humidity");
var fiveDayEl = document.querySelector(".fiveDay");
var searchHistory = [];

function getHistory() {
    var cityArrList = JSON.parse(localStorage.getItem("cities"));
    if (cityArrList) {
        searchHistory = cityArrList
    }
    renderCity()
}

function addToHistory(data) {
    if (searchHistory.indexOf(data) !== -1) {
        return
    }
    searchHistory.push(data);
    localStorage.setItem("cities", JSON.stringify(searchHistory));
    getHistory()
}

//This shows the search button function
searchbtn.addEventListener("click", () => {
    var citySearch = userInput.value
    addToHistory(citySearch)
    weatherAPI(citySearch);
})



// This shows the five days on the right side 
function fiveDay(data) {
    fiveDayEl.textContent = ''
    for (let i = 0; i < data.list.length; i += 8) {
        console.log(data.list[i])
        const html = `<div class="card col-2">
                    <div class="card-title">${data.list[i].dt_txt}</div>
                    <div class="card-body">Temp: ${data.list[i].main.temp} degrees <br /> 
                    Wind: ${data.list[i].wind.speed} MPH <br /> 
                    Humidity: ${data.list[i].main.humidity} %</div>
                </div>`
        fiveDayEl.insertAdjacentHTML("beforeend", html)
    }
}

//This shows the current day on the top right side 
function showWeather(data) {
    cityName.textContent = data.city.name + ` ${data.list[0].dt_txt}`;
    temp.textContent = `Temp: ${data.list[0].main.temp} degrees`
    wind.textContent = `Wind: ${data.list[0].wind.speed} MPH`
    humidity.textContent = `Humidity ${data.list[0].main.humidity} %`
}

//Fetching the open weather data
function weatherAPI(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            showWeather(data);
            fiveDay(data);
        })


}


function historyClick(e) {
    var button = e.target;
    var searchCity = button.getAttribute("data-value")
    console.log(searchCity)
    weatherAPI(searchCity)
}

//
function renderCity(data) {
    recentSearch.textContent = "";
    for (let i = 0; i < searchHistory.length; i++) {
        let cityButton = document.createElement("button");
        cityButton.textContent = searchHistory[i];
        cityButton.setAttribute("class", "searched-city-btn btn btn-secondary my-1");
        cityButton.setAttribute("data-value", searchHistory[i])
        recentSearch.appendChild(cityButton);
    }
}
recentSearch.addEventListener("click", historyClick)
getHistory()
