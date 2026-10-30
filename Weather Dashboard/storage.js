export function saveRecentCity(city) {
    let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

    recentCities = recentCities.filter(
        item => item.name !== city.name || item.country !== city.country
    );

    recentCities.unshift(city);

    recentCities = recentCities.slice(0, 5);

    localStorage.setItem("recentCities", JSON.stringify(recentCities));
}

export function saveLastCity(city){
    localStorage.setItem("lastCity", JSON.stringify(city));
}

export function loadLastCity() {
    return JSON.parse(localStorage.getItem("lastCity"));
}
