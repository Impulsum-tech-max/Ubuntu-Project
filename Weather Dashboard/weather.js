import { formatTime, getWeatherIcon } from "./helpers.js";
import { saveLastCity, saveRecentCity } from "./storage.js";

import {
    dashboard,
    firstRow,
    secondRow,
    thirdRow,
    fourthRow,
    fifthRow
} from "./dom.js";

export async function fetchWeather(latitude, longitude, cityName, country) {
try{
    const weatherURL=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto&daily=sunrise,sunset`;

    const weatherRequest=await fetch(weatherURL);

    if(!weatherRequest.ok){
        throw new Error("Weather request failed.");
    }

    const weatherData=await weatherRequest.json();

const city = {
    name: cityName,
    country: country,
    latitude: latitude,
    longitude: longitude
};


    const localTime=weatherData.current.time;

    const [localDate, localClock] = localTime.split("T");

    const date = new Date(`${localDate}T12:00:00Z`);

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
    }).format(date);

    const [hours, minutes] = localClock.split(":").map(Number);

    const period = hours >= 12 ? "pm" : "am";
    const hour12 = hours % 12 || 12;

    const formattedTime = `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;

        const isDay=weatherData.current.is_day;

        console.log({
        time: weatherData.current.time,
        timezone: weatherData.timezone,
        is_day: weatherData.current.is_day
    });

    const currentTemperature=weatherData.current.temperature_2m;
    const currentHumidity=weatherData.current.relative_humidity_2m;
    const currentApparentTemperature=weatherData.current.apparent_temperature;
    const windSpeed=weatherData.current.wind_speed_10m;
    const weatherCode=weatherData.current.weather_code;
    const sunrise = weatherData.daily.sunrise[0];
    const sunset = weatherData.daily.sunset[0];

    const sunriseTime = sunrise.split("T")[1];
    const sunsetTime = sunset.split("T")[1];
    const formattedSunrise = formatTime(sunriseTime);
    const formattedSunset = formatTime(sunsetTime); 

    if(isDay===1){
        dashboard.classList.remove("nighttime");
        dashboard.classList.add("daytime");
    }else if(isDay===0){
        dashboard.classList.remove("daytime");
        dashboard.classList.add("nighttime")
    }

    let weatherCondition;

    switch (weatherCode) {
        case 0:
        weatherCondition="Clear Sky"
            break;
  
        case 1:
        weatherCondition="Mainly Clear"
            break;

        case 2:
        weatherCondition="Partly Cloudy"
            break;
        
        case 3:
        weatherCondition="Overcast"
            break;
      
        case 45:
        case 48:
        weatherCondition="Fog"
            break;
  
        case 51:
        case 53: 
        case 55:
        weatherCondition="Drizzle"
            break;
  
        case 56: 
        case 57:
        weatherCondition="Freezing Drizzle"
            break;

        case 61: 
        case 63: 
        case 65:
        weatherCondition="Rain"
            break;
      
        case 66: 
        case 67:
        weatherCondition="Freezing Rain"
            break;

        case 71: 
        case 73: 
        case 75:
        weatherCondition="Snowfall"
            break;
      
        case 77:
        weatherCondition="Snow Grains"
            break;

        case 80: 
        case 81: 
        case 82:
        weatherCondition="Rain Showers"
            break;
      
        case 85:
        case 86:
        weatherCondition="Snow Showers"    
            break;

        case 95:
        weatherCondition="Thunderstorm"
            break;
        
        case 96: 
        case 99:
        weatherCondition="Thunderstorm With Hail"
            break;
      
        default:
            weatherCondition="Unknown Weather Condition"
            break;
    }

    firstRow.innerHTML=`<h2>${cityName}, ${country}</h2>`;

    secondRow.innerHTML=`<h2>${formattedDate} - ${formattedTime}</h2>`

    thirdRow.innerHTML=
    `<h2>
    <span class="material-symbols-outlined icon">thermostat</span>
    <span>TEMPERATURE:</span> ${currentTemperature} &deg;C <span class="separator">|</span></h2>
    <h2>
    <span class="material-symbols-outlined icon">water_drop</span>
    <span>HUMIDITY:</span> ${currentHumidity}% <span class="separator">|</span></h2>
    <h2>
    <span class="material-symbols-outlined icon">device_thermostat</span>
    <span>FEELS LIKE:</span> ${currentApparentTemperature} &deg;C</h2>`;

    fourthRow.innerHTML=
    `<h2>
    <span class="material-symbols-outlined icon">air</span>
    <span>WIND SPEED:</span> ${windSpeed} Km/h <span class="separator">|</span></h2>
    <h2>
    <span class="material-symbols-outlined icon">${getWeatherIcon(weatherCode)}</span>
    <span>CONDITION:</span> ${weatherCondition}</h2>`;

    fifthRow.innerHTML =
    `<h2>
    <span class="material-symbols-outlined icon">wb_sunny</span>
    <span>SUNRISE:</span> ${formattedSunrise} <hr></h2>
    <h2>
    <span class="material-symbols-outlined icon">wb_twilight</span>
    <span>SUNSET:</span> ${formattedSunset}</h2>`;


saveLastCity(city);
saveRecentCity(city);

document.dispatchEvent(new Event("recentCitiesUpdated"));
}   
catch(error){
    alert("There was an error while requesting data.")
}
}

