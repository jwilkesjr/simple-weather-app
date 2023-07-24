// Select the form and the necessary DOM elements
const form = document.querySelector(".search-box");
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");


// EventListener for the search button and form submit
form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevents the form from submitting and refreshing the page
    getWeatherData();
});

async function getWeatherData() {
    //Use your API key
    const APIKey = "abab6ae37de274ff51d841fa22335acf";
    const city = document.querySelector(".search-box input").value;

    //Return if no city is provided
    if (city === "") return;

    try {
        //Fetch the weather data from the API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        const json = await response.json();

        //If location is not found, show the error
        if (json.cod === "404") {
            displayError();
            return;
        }

        //Otherwise, display the weather data
        displayWeatherData(json);
    } catch (error) {
        console.log("Failed to fetch the weather data", error);
    }
}

//Function to display the error
function displayError() {
    container.style.height = "400px";
    weatherBox.style.display  = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "block";
    error404.classList.add("fadeIn");
}

//Function to display the weather data
function displayWeatherData(json) {
    error404.style.display = "none";
    error404.classList.remove("fadeIn");

    const image = document.querySelector(".weather-box img");
    const temperature = document.querySelector(".weather-box .temperature");
    const description = document.querySelector(".weather-box .description");
    const humidity = document.querySelector(".weather-details .humidity span");
    const wind = document.querySelector(".weather-details .wind span");

    switch(json.weather[0].main){
        case "Clear":
            image.src = "images/clear.png";
            break;
        case "Rain":
            image.src = "images/rain.png";
            break;
        case "Snow":
            image.src = "images/snow.png";
            break;
        case "Clouds":
            image.src = "images/cloud.png";
            break;
        case "Haze":
            image.src = "images/mist.png";
            break;
        default:
            image.src = "";
    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    weatherBox.style.display = "";
    weatherDetails.style.display = "";
    weatherBox.classList.add("fadeIn");
    weatherDetails.classList.add("fadeIn");
    container.style.height = "590px";
}
