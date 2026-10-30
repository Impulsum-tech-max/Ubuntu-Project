export function formatTime(time) {
    const [hours, minutes] = time.split(":").map(Number);

    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;

    return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function getWeatherIcon(weathercode) {
    if (weathercode === 0) return "sunny";
    if (weathercode >= 1 && weathercode <= 2) return "partly_cloudy_day";
    if (weathercode === 3) return "cloud";
    if (weathercode === 45 || weathercode === 48) return "foggy";
    if (weathercode >= 51 && weathercode <= 67) return "rainy";
    if (weathercode >= 71 && weathercode <= 77) return "weather_snowy";
    if (weathercode >= 80 && weathercode <= 82) return "rainy";
    if (weathercode >= 85 && weathercode <= 86) return "weather_snowy";
    if (weathercode >= 95 && weathercode <= 99) return "thunderstorm";

    return "partly_cloudy_day";
}


