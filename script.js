// Creating elements
const APIkey = "2094e670d6bacf45e0476b19709a6bb9";
var searchbtn = document.querySelector("#search-button");
var userInput = document.querySelector("#user-search-input");
var recentSearch = document.querySelector("#recent-search");
var cityArrList = JSON.parse(localStorage.getItem("cities")) || [];
console.log(cityArrList)
// var city = cityArrList[7] || "";
var cityName = document.querySelector(".cityName");
var temp = document.querySelector(".temp");
var wind = document.querySelector(".wind");
var humidity = document.querySelector(".humidity");
var fiveDayEl = document.querySelector(".fiveDay")

//This shows the search button function
searchbtn.addEventListener("click", () => {
    var citySearch = userInput.value
    cityArrList.push(citySearch);
    console.log(cityArrList);
    // localStorage.setItem("cities", cityArrList)
    weatherAPI(citySearch);

})



// This shows the five days on the right side 
function fiveDay(data) {
    console.log(cityArrList)
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
    // console.log(cityArrList)
    console.log(data)
    console.log(data.cnt);
    cityName.textContent = data.city.name + ` ${data.list[0].dt_txt}`;
    temp.textContent = `Temp: ${data.list[0].main.temp} degrees`
    wind.textContent = `Wind: ${data.list[0].wind.speed} MPH`
    humidity.textContent = `Humidity ${data.list[0].main.humidity} %`

}

//Fetching the open weather data
function weatherAPI(city) {
    console.log(cityArrList)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            showWeather(data);
            fiveDay(data);
            renderCity(data)
        })


}

//
function renderCity(data) {
    console.log(cityArrList)
    recentSearch.innerHTML = "";
    for (let i = 0; i < data.list.length; i++) {
        console.log(data);
        let cityButton = document.createElement("button");
        cityButton.textContent = data.city.name;
        cityButton.setAttribute("class", "searched-city-btn btn btn-secondary my-1");
        recentSearch.appendChild(cityButton);
    }
}


