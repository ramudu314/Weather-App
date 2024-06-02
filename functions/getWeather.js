import axios from 'axios';

export default async function getWeather(cityName, stateCode, countryCode) {
    const apiKey = '01b24d955122badd46132461696948fb';
    
    const request = {
        method: 'GET',
        url: 'http://api.openweathermap.org/geo/1.0/direct',
        params: {
            q: `${cityName},${stateCode},${countryCode}`,
            limit: 1,
            appid: apiKey
        }
    };

    let weather = [];

    try {
        const response = await axios(request);

        if (response.status === 200 && response.data.length > 0) {
            const { lat, lon } = response.data[0];

            // Fetch current weather using lat and lon
            const weatherRequest = {
                method: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/weather',
                params: {
                    lat: lat,
                    lon: lon,
                    appid: apiKey
                }
            };

            const weatherResponse = await axios(weatherRequest);

            if (weatherResponse.status === 200) {
                weather = weatherResponse.data;
            }
        }
    } catch (error) {
        console.error('Weather API error', error);
    }

    return weather;
}
