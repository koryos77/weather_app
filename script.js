document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'cfc4ec3ead6a3e6214af7af6ed72a838';

    const cityInput = document.getElementById('city-input');
    const getWeatherButton = document.getElementById('get-weather');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const weatherDescription = document.getElementById('weather-description');
    const errorMessage = document.getElementById('error-message');
    const unitSelector = document.getElementById('unit-selector');

    // Function to retrieve weather data
    async function getWeather(city, units) {
        console.log("Fetching weather data for city:", city);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=en`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("Weather data received:", data); 

            if (data.cod === '404') {
                throw new Error('City not found');
            }

            // Display weather data
            cityName.textContent = data.name;
            temperature.textContent = `Temperature : ${data.main.temp} ${units === 'metric' ? '°C' : '°F'}`;
            humidity.textContent = `Humidity : ${data.main.humidity}%`;
            weatherDescription.textContent = `Description : ${data.weather[0].description}`;
            errorMessage.textContent = ''; // Delete error messages
        } catch (error) {
            errorMessage.textContent = error.message; // display error
            console.error("Error fetching weather data:", error); // Error log
        }
    }

    // Add event to button
    getWeatherButton.addEventListener('click', () => {
        const city = cityInput.value.trim(); // Retrieve name of city
        const selectedUnit = unitSelector.value; // Get selected unit (metric or imperial)

        if (city) {
            getWeather(city, selectedUnit); // Call getWeather function to retrieve weather data
        } else {
            errorMessage.textContent = 'Enter the city name.'; // Error if no city is entered
        }
    });
});
