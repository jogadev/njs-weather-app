

document.addEventListener('DOMContentLoaded', (doc, evt) => {
    const cityForm = document.querySelector('#formCity');
    cityForm.addEventListener('submit', evt => {
        evt.preventDefault();
        fetch('http://localhost:3000/weather?city='+evt.target.city.value).then(response => {
            response.json().then(result => {
                if (result.code != 200) {
                    console.error("An error", result)
                } else {
                    const temperatureTag = document.querySelector('#results > .row > .col.temp > p')
                    const thermalSensationTag = document.querySelector('#results > .row > .col.thermal-sensation > p')
                    const humidityTag = document.querySelector('#results > .row > .col.humidity > p')
                    const windSpeedTag = document.querySelector('#results > .row > .col.wind-speed > p')

                    temperatureTag.textContent = result.data.temperature.cl;
                    thermalSensationTag.textContent = result.data.thermalSensation.cl;
                    humidityTag.textContent = result.data.humidity;
                    windSpeedTag.textContent = result.data.windSpeed;
                    const resultHeader = document.querySelector('#results #cityResult')
                    resultHeader.textContent = evt.target.city.value;
                    const resultContainer = document.querySelector('#results');
                    resultContainer.classList.remove('hide')
                }
            })
        })

    })
})