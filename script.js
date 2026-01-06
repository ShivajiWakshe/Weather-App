const apiKey = "df1a47f78b638c2ad10875face0c1388";

const btn = document.getElementById("getWeatherBtn");
const loader = document.getElementById("loader");
const weatherDiv = document.getElementById("weatherResult");
const icon = document.getElementById("icon");

btn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  loader.classList.remove("hidden");
  weatherDiv.classList.remove("show");
  icon.style.display = "none";
  document.body.className = "";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      loader.classList.add("hidden");

      if (data.cod !== 200) {
        // ❌ City not found case
        icon.style.display = "none";
        icon.src = "";
        document.getElementById("cityName").innerText = "";
        document.getElementById("temp").innerText = "";
        document.getElementById("desc").innerText = "City not found!";
        weatherDiv.classList.add("show");
        return;
      }

      // ✅ Valid city
      document.getElementById("cityName").innerText = data.name;
      document.getElementById("temp").innerText = `Temperature: ${data.main.temp} °C`;
      document.getElementById("desc").innerText = data.weather[0].description;

      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      icon.style.display = "block";

      weatherDiv.classList.add("show");

      const weatherType = data.weather[0].main.toLowerCase();
      if (weatherType.includes("cloud")) document.body.classList.add("clouds");
      else if (weatherType.includes("rain")) document.body.classList.add("rain");
      else if (weatherType.includes("snow")) document.body.classList.add("snow");
      else document.body.classList.add("sunny");
    })
    .catch(() => {
      loader.classList.add("hidden");
      alert("API error. Please try again later.");
    });
});
