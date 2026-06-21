async function getWeatherData() {

    const cityName = document.querySelector("#cityInput").value.trim();

    if(cityName === ""){
        alert("Please Enter City Name");
        return;
    }

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=ca018df54353f065aaed7d802825b8be`
    );

    const data = await response.json();

    console.log(data);

    if (data.cod != 200) {
        document.querySelector("#dataResult").innerHTML =
        `<p class="text-danger text-center">${data.message}</p>`;
        return;
    }

    renderData(data);

    document.querySelector("#cityInput").value = "";
}

function renderData(data) {

    document.title = `${data.name} - ${Math.round(data.main.temp)}°C`;
    document.querySelector("#dataResult").innerHTML = `

        <div class="text-center mt-4">

            <h2>${data.name}</h2>
            <p>🇮🇳 ${data.sys.country}</p>

            <img
                src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"
                width="120"
            >

            <h1>${Math.round(data.main.temp)}°C</h1>

            <h5 class="text-capitalize">
                ${data.weather[0].description}
            </h5>

            <div class="row mt-3">

                <div class="col-4">
                    <div class="card p-2 bg-dark text-white">
                        <h6>${data.main.humidity}%</h6>
                        <small>Humidity</small>
                    </div>
                </div>

                <div class="col-4">
                    <div class="card p-2 bg-dark text-white">
                        <h6>${data.wind.speed} m/s</h6>
                        <small>Wind</small>
                    </div>
                </div>

                <div class="col-4">
                    <div class="card p-2 bg-dark text-white">
                        <h6>${Math.round(data.main.feels_like)}°C</h6>
                        <small>Feels Like</small>
                    </div>
                </div>

            </div>

        </div>

    `;
}