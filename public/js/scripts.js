document.addEventListener('DOMContentLoaded', (doc, evt) => {
    const cityForm = document.querySelector('#formCity');
    const resultContainer = document.querySelector('#results');
    const errorMessageContainer = document.querySelector('#errorMessage');

    // For positive result
    const temperatureTag = document.querySelector('#results > .row > .col.temp > p')
    const thermalSensationTag = document.querySelector('#results > .row > .col.thermal-sensation > p')
    const humidityTag = document.querySelector('#results > .row > .col.humidity > p')
    const windSpeedTag = document.querySelector('#results > .row > .col.wind-speed > p')
    const resultHeader = document.querySelector('#results #cityResult')

    // For negative result
    const errorMessage= document.querySelector("#errorMessage > p");
    const errorHeader = document.querySelector("#errorMessage > h2");
    cityForm.addEventListener('submit', evt => {
        evt.preventDefault();
        fetch('/weather?city=' + evt.target.city.value).then(response => {
            response.json().then(result => {
                if (result.code != 200) {
                    resultContainer.classList.add("hide");
                    errorMessage.textContent = result.message;
                    errorHeader.textContent = `Error ${result.code}`;
                    errorMessageContainer.classList.remove("hide");
                } else {
                    errorMessageContainer.classList.add("hide")
                    temperatureTag.textContent = result.data.temperature.cl;
                    thermalSensationTag.textContent = result.data.thermalSensation.cl;
                    humidityTag.textContent = result.data.humidity;
                    windSpeedTag.textContent = result.data.windSpeed;
                    resultHeader.textContent = evt.target.city.value;
                    resultContainer.classList.remove('hide')
                }
            })
        })

    })
})