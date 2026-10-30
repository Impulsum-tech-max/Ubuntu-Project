import "./search.js";
import { loadLastCity } from "./storage.js";
import { fetchWeather } from "./weather.js";

import {
    recentSearches,
    recentCities,
    suggestions,
    searchInput,
    searchButton
} from "./dom.js";

export function displayRecentCities() {
    const recentCitiesList = JSON.parse(localStorage.getItem("recentCities")) || [];

    recentCities.innerHTML = "";

    recentCitiesList.forEach(city => {
        const button = document.createElement("button");

        button.textContent = `${city.name}, ${city.country}`;

        button.addEventListener("click", () => {
            fetchWeather(
                city.latitude,
                city.longitude,
                city.name,
                city.country
            );
        });

        recentCities.append(button);
    });

    recentSearches.style.display = recentCitiesList.length ? "block" : "none";
}


suggestions.addEventListener("transitionend", (event) => {
    if (
        event.propertyName === "opacity" &&
        !suggestions.classList.contains("show")
    ) {
        suggestions.innerHTML = "";
    }
});

document.addEventListener("click", (event)=>{
    if (
    !suggestions.contains(event.target) &&
    !searchInput.contains(event.target) &&
    !searchButton.contains(event.target)
) {
    suggestions.classList.remove("show");
}
})

displayRecentCities();

const city = loadLastCity();

if (city) {
    fetchWeather(city.latitude, city.longitude, city.name, city.country)
}

document.addEventListener("recentCitiesUpdated", ()=>{
    displayRecentCities();
})