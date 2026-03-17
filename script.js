const apiKey = "98e49455af3d4e8dbd480321261603";
const weatherDiv = document.getElementById("weather");
const body = document.body;
const btn = document.getElementById("getWeatherBtn");

function getWeatherTheme(condition) {
  condition = condition.toLowerCase();
  if(condition.includes("sun") || condition.includes("clear")) return {emoji:"☀️🐶", bg:"sunny"};
  if(condition.includes("cloud")) return {emoji:"☁️🐕", bg:"cloudy"};
  if(condition.includes("rain") || condition.includes("drizzle")) return {emoji:"🌧️🐾", bg:"rainy"};
  if(condition.includes("snow")) return {emoji:"❄️🐩", bg:"snowy"};
  if(condition.includes("storm") || condition.includes("thunder")) return {emoji:"⚡🐶", bg:"storm"};
  return {emoji:"🐾", bg:""};
}

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if(!city) return alert("Please enter a city name!");

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
    if(!response.ok) throw new Error("City not found!");

    const data = await response.json();
    const { name, country } = data.location;
    const { temp_c, condition, humidity, wind_kph } = data.current;

    const theme = getWeatherTheme(condition.text);
    body.className = theme.bg;

    weatherDiv.innerHTML = `
      <h2>${name}, ${country}</h2>
      <p>🌡️ Temp: ${temp_c}°C</p>
      <p>🌥️ Condition: ${condition.text} ${theme.emoji}</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>💨 Wind: ${wind_kph} kph</p>
      <div class="dog-emoji">${theme.emoji}</div>
    `;
  } catch(err) {
    weatherDiv.innerHTML = `<p style="color:red">${err.message}</p>`;
    body.className = "";
  }
}

btn.addEventListener("click", getWeather);
document.getElementById("city").addEventListener("keydown", e => {
  if(e.key === "Enter") getWeather();
});
