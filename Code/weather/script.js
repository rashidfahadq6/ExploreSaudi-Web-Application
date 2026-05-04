const api_key = 'dcee1e712ff0d85a5f9c8ce005bce82e';  // Your API key

// DOM elements
let cityInput = document.getElementById('city_input');
let searchBtn = document.getElementById('searchBtn');

// Function to get city coordinates using OpenWeather Geocoding API
function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = '';  // Clear input field after fetching city name
    if (!cityName) return;  // Do nothing if the input is empty

    // Geocoding API URL to fetch latitude and longitude of the city
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;

    // Fetch the city coordinates
    fetch(GEOCODING_API_URL)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                let { name, lat, lon, country } = data[0];  // Extract location details
                getWeatherDetails(lat, lon);  // Call to fetch weather details
                getAirQuality(lat, lon);  // Call to fetch air quality details
                getForecast(lat, lon);  // Call to fetch 5 days forecast
            } else {
                alert(`City not found: ${cityName}`);
            }
        })
        .catch(() => {
            alert(`Failed to fetch coordinates of ${cityName}`);
        });
}

// Function to fetch current weather details
function getWeatherDetails(lat, lon) {
    let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

    fetch(WEATHER_API_URL)
        .then(res => res.json())
        .then(data => {
            displayWeatherData(data);  // Display fetched weather data
        })
        .catch(() => {
            alert(`Failed to fetch weather details`);
        });
}

// Function to display weather data
function displayWeatherData(data) {
    // Update the HTML elements with the fetched data
    document.querySelector('.temperature').textContent = `${data.main.temp}°C`;
    document.querySelector('.location').textContent = `${data.name}, ${data.sys.country}`;
    document.querySelector('.date').textContent = new Date().toLocaleDateString();
    document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
    document.querySelector('.pressure').textContent = `${data.main.pressure} hPa`;
    document.querySelector('.wind-speed').textContent = `${data.wind.speed} m/s`;
    document.querySelector('.visibility').textContent = `${data.visibility / 1000} km`;

    // Add more data display logic here (icon, description, etc.)
}

// Function to fetch air quality details
function getAirQuality(lat, lon) {
    let AIR_QUALITY_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;

    fetch(AIR_QUALITY_API_URL)
        .then(res => res.json())
        .then(data => {
            displayAirQualityData(data.list[0]);  // Display air quality data
        })
        .catch(() => {
            alert(`Failed to fetch air quality data`);
        });
}

// Function to display air quality data
function displayAirQualityData(data) {
    document.querySelector('.co').textContent = data.components.co;
    document.querySelector('.pm25').textContent = data.components.pm2_5;
    document.querySelector('.pm10').textContent = data.components.pm10;
    document.querySelector('.no2').textContent = data.components.no2;
    document.querySelector('.o3').textContent = data.components.o3;
}

// Function to fetch 5-day weather forecast
function getForecast(lat, lon) {
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

    fetch(FORECAST_API_URL)
        .then(res => res.json())
        .then(data => {
            displayForecastData(data);  // Display forecast data
        })
        .catch(() => {
            alert(`Failed to fetch forecast data`);
        });
}

// Function to display forecast data (simplified for 5-day forecast)
function displayForecastData(data) {
    let forecastContainer = document.querySelector('.forecast-list');
    forecastContainer.innerHTML = '';  // Clear previous forecast

    // Loop through the forecast and display data (simplified to one forecast per day)
    for (let i = 0; i < data.list.length; i += 8) {
        let forecastItem = `
            <div class="forecast-item">
                <i class="fa fa-cloud"></i>
                <p class="forecast-temp">${data.list[i].main.temp}°C</p>
                <p class="forecast-date">${new Date(data.list[i].dt_txt).toLocaleDateString()}</p>
            </div>
        `;
        forecastContainer.innerHTML += forecastItem;
    }
}

// Event listener to trigger search when button is clicked
searchBtn.addEventListener('click', getCityCoordinates);
