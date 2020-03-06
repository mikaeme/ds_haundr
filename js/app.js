'use strict';

const proxyUrl = 'https://cors-anywhere.herokuapp.com';
const cloud01 = document.querySelector('#cloud-01');
const cloud02 = document.querySelector('#cloud-02');
const cloud03 = document.querySelector('#cloud-03');
const sun01 = document.querySelector('#sun-01');

cloud01.style.display = 'none';
cloud02.style.display = 'none';
cloud03.style.display = 'none';
sun01.style.display = 'none';

const showReport = async (report) => {
    const temperature = Math.round(report.main.temp - 272);
    const wind = Math.round(report.wind.speed);
    const clouds = report.clouds.all;

    document.querySelector('#temp').innerHTML += ('<p>' + (temperature) + '°C</p>');
    document.querySelector('#wind').innerHTML += ('<p>' + (wind) + ' m/s</p>');

    if (clouds == 75) {
        cloud01.style.display = 'none';
        cloud02.style.display = 'block';
        cloud03.style.display = 'none';
        sun01.style.display = 'none';
    } else if (clouds < 25) {
        cloud01.style.display = 'none';
        cloud02.style.display = 'none';
        cloud03.style.display = 'none';
        sun01.style.display = 'block';
    } else if (clouds > 75) {
        cloud01.style.display = 'block';
        cloud02.style.display = 'none';
        cloud03.style.display = 'none';
        sun01.style.display = 'none';
    } else {
        cloud01.style.display = 'none';
        cloud02.style.display = 'none';
        cloud03.style.display = 'block';
        sun01.style.display = 'none';
    }

}
const getJsonMenu = async (menuUrl, useProxy = true) => {
    let response;
    try {
        response = await fetch(`${useProxy ? proxyUrl : ''}/${menuUrl}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
    } catch (error) {
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

