// Custom function example
export function getWeather(city) {
  const weatherData = {
    Delhi: "Sunny",
    "New York": "Snowy",
    London: "Rainy",
    Tokyo: "Cloudy",
  };

  return weatherData[city] || "Weather data not available.";
}
