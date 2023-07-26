const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast/hourly';

// Function to get weather data from the OpenWeatherMap API
async function getWeatherData(city) {
    try {
        const response = await axios.get(API_BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching weather data');
    }
}

// Function to get temperature for a specific date
function getTemperature(data, date) {
    const result = data.list.find(item => item.dt_txt.includes(date));
    return result ? result.main.temp : null;
}

// Function to get wind speed for a specific date
function getWindSpeed(data, date) {
    const result = data.list.find(item => item.dt_txt.includes(date));
    return result ? result.wind.speed : null;
}

// Function to get pressure for a specific date
function getPressure(data, date) {
    const result = data.list.find(item => item.dt_txt.includes(date));
    return result ? result.main.pressure : null;
}

app.use(express.json());

// Endpoint to handle user input
app.post('/get-info', async (req, res) => {
    const { option, date, city } = req.body;
    try {
        const data = await getWeatherData(city);
        let result;
        switch (option) {
            case 1:
                result = getTemperature(data, date);
                break;
            case 2:
                result = getWindSpeed(data, date);
                break;
            case 3:
                result = getPressure(data, date);
                break;
            default:
                return res.status(400).json({ error: 'Invalid option' });
        }
        return res.json({ result });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
