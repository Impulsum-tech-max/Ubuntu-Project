import { fetchWeather } from "./weather.js";

import {
    searchInput,
    searchButton,
    suggestions
} from "./dom.js";

let selectedSuggestionIndex = -1;

export function highlightSuggestion(buttons) {
    buttons.forEach((button, index) => {
        button.classList.toggle(
            "selected",
            index === selectedSuggestionIndex
        );
    });
}

export function searchCity(){
    if(searchInput.value.trim()===""){
        alert("Enter a city name.")
    }else{
        const city=searchInput.value.trim();
        suggestions.innerHTML = "";
        getWeather(city);

        searchInput.value="";
    }
}

export function displaySuggestions(results) {
    suggestions.innerHTML="";
    selectedSuggestionIndex = -1;
    suggestions.classList.add("show")

    results.forEach(result => {
        const button=document.createElement("button");
        button.textContent = [result.name, result.admin1, result.country]
        .filter(Boolean)
        .join(", ");
        
        suggestions.append(button);

        button.addEventListener("click", ()=>{
            fetchWeather(result.latitude, result.longitude, result.name, result.country);
            suggestions.classList.remove("show");
        });
    });
}

export async function getWeather(city) {
    try{
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;


    const request=await fetch(url);

        if(!request.ok){
            throw new Error("Geocoding request failed.");
        }

    const data= await request.json();

    if(!data.results || data.results.length===0){
        alert("City does not exist.")
        return;
    }

    displaySuggestions(data.results);
} 
    catch(error){
    alert("Unable to retrieve weather data. Check your internet connection and try again.");
    }
    }

searchButton.addEventListener("click", ()=>{
    searchCity();
})

searchInput.addEventListener("keydown", (event) => {
    const buttons = suggestions.querySelectorAll("button");

    if (event.key === "ArrowDown" && buttons.length > 0) {
        event.preventDefault();

        selectedSuggestionIndex =
            (selectedSuggestionIndex + 1) % buttons.length;

        highlightSuggestion(buttons);
    }

    else if (event.key === "ArrowUp" && buttons.length > 0) {
        event.preventDefault();

        selectedSuggestionIndex =
            (selectedSuggestionIndex - 1 + buttons.length) % buttons.length;

        highlightSuggestion(buttons);
    }

    else if (event.key === "Enter") {
        event.preventDefault();

        if (
            selectedSuggestionIndex >= 0 &&
            selectedSuggestionIndex < buttons.length
        ) {
            buttons[selectedSuggestionIndex].click();
        } else {
            searchCity();
        }
    }

    else if (event.key === "Escape") {
        suggestions.classList.remove("show");
    }
});
