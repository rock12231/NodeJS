// app.js

const express = require('express');

const axios = require('axios');

const app = express();
const PORT = 3000;

// Sample OpenWeatherMap API URL
const API_URL = 'https://samples.openweathermap.org/data/2.5/forecast/hourly?';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Function to fetch weather data based on user input
async function getWeatherData(city, date) {
    try {
        // const response = await axios.get(`${API_URL}q=${city}&appid=b6907d289e10d714a6e88b30761fae22`);
        // Get response JSON data from file 
        console.log("date >>>>>>>>>>",date);
        // 2019-03-28T12:00 to 2019-03-28 12:00:00
        date = date.replace("T"," ");
        // const ndate = new Date(date).getTime() / 1000;
        // console.log(">>>>>>>>>>",ndate);
        const response = require('./hr.json');
        // console.log("json >>>>>>>>>>",response.list[0].dt);
        // console.log("date >>>>>>>>>>",date);

        const result = response.list.find(item => item.dt_txt.includes(date));
        console.log("result >>>>>>>>>>",result);
        // Process the response JSON data based on the date and return the desired weather parameter
        // {
        // "list": [
        //     {
        //         "dt": 1553709600,
        //         "main": {},
        //         "weather": [],
        //         "clouds": {},
        //         "wind": {},
        //         "sys": {},
        //         "dt_txt": "2019-03-27 18:00:00"
        //     },
        //     {
        //         "dt": 1553713200,
        //         "main": {},
        //         "weather": [],
        //         "clouds": {},
        //         "wind": {},
        //         "sys": {},
        //         "dt_txt": "2019-03-27 19:00:00"
        //     }
        // ]
        // }
        // finde date in list with dt = date
        // const result = response.data.list.find(item => item.dt.includes(date));

        // For example, you can extract the temperature, wind speed, or pressure for the input date.
        return result ? result : null;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw error;
    }
}

app.get('/', (req, res) => {
    // Serve an HTML page that prompts the user for their choice
    res.send(`
    <html>
      <body>
        <h1>Weather Information</h1>
        <form action="/weather" method="post">
          <label for="option">Choose an option:</label>
          <select name="option" id="option">
            <option value="1">Get weather</option>
            <option value="2">Get wind speed</option>
            <option value="3">Get pressure</option>
          </select>
          <br>
          <label for="date">Enter date:</label>
          <input type="datetime-local" name="date" id="date">
          <br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

app.post('/weather', async (req, res) => {
    const { option, date } = req.body;
    // const ndate = new Date(date).getTime() / 1000;
    // console.log(">>>>>>>>>>",option, ndate);

    // console.log(">>>>>>>>>>",option, date);
    const city = 'London,us'; // Replace this with the desired city

    try {
        let result;
        switch (option) {
            case '1':
                result = await getWeatherData(city, date);
                // Extract and display the temperature for the input date
                res.send(`Temperature on ${date}: ${result.main.temp}°C`);
                break;
            case '2':
                result = await getWeatherData(city, date);
                // Extract and display the wind speed for the input date
                res.send(`Wind Speed on ${date}: ${result.wind.speed} m/s`);
                break;
            case '3':
                result = await getWeatherData(city, date);
                // Extract and display the pressure for the input date
                res.send(`Pressure on ${date}: ${result.main.pressure} hPa`);
                break;
            case '0':
                res.send('Exiting the program.');
                process.exit(0);
            default:
                res.send('Invalid option.');
        }
    } catch (error) {
        res.status(500).send('An error occurred. Please try again later.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
