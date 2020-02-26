'use strict';

const proxyUrl = 'https://cors-anywhere.herokuapp.com';

const showReport = async (report) => {
    document.querySelector('#temp').innerHTML = ('<li>Lämpötila: ' + (Math.round(report.main.temp - 273)) + '°C</li>');
    document.querySelector('#wind').innerHTML = ('<li>Tuuli: ' + (Math.round(report.wind.speed)) + ' m/s</li>');
    document.querySelector('#cloud').innerHTML = ('<li>Pilvisyys: ' + (report.clouds.all) + '%</li>');
}
const getJsonMenu = async (menuUrl, useProxy = true) => {
    let response;
    try {
        response = await fetch(`${useProxy ? proxyUrl: ''}/${menuUrl}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
    } catch(error) {
        console.error('Fetch menu error', error.message);
    }
    let weather = await response.json();
    console.log(weather);
    return weather;
};

const getWeather = async () => {
    const response = await getJsonMenu('http://api.openweathermap.org/data/2.5/weather?q=Vantaa,fi&APPID=de4a850978be558877b5e66f393abd6b');
    const weather = await response;
    showReport(weather);
};

getWeather();

