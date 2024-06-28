const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "f3dd5c8afc2ef0dc48c203651a0361d1";

weatherform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityinput.value;
    if (city) {
        try {
            const weatherdata = await getweatherdata(city);
            displayweather(weatherdata);
        } catch (error) {
            displayerror("Could not fetch weather data. Please try again.");
        }
    } else {
        displayerror("Please enter a city.");
    }
});

async function getweatherdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayweather(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humidistydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)} °F`;
    humidistydisplay.textContent = `Humidity: ${humidity}%`;
    descdisplay.textContent = description;
    weatherEmoji.textContent = getweatheremoji(id);

    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humidistydisplay.classList.add("humidtydisplay");
    descdisplay.classList.add("descdisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humidistydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatherEmoji);
}

function getweatheremoji(weatherid) {
    switch (true) {
        case (weatherid >= 200 && weatherid < 300):
            return "🌩️";
        case (weatherid >= 300 && weatherid < 400):
            return "🌦️";
        case (weatherid >= 500 && weatherid < 600):
            return "🌧️";
        case (weatherid >= 600 && weatherid < 700):
            return "❄️";
        case (weatherid >= 700 && weatherid < 800):
            return "🌫️";
       
        case (weatherid > 800 && weatherid < 810):
            return "☁️";
        default:
            return "🤷";
    }
}

function displayerror(message) {
    const errordisplay = document.createElement('p');
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");
    card.textContent = '';
    card.style.display = "flex";
    card.appendChild(errordisplay);
}
