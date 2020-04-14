const axios = require("axios");


async function getWeather(coordsString, callback) {
    const darkSkyURL = "https://api.darksky.net/forecast/437532d30a01a557113de117a2ea77ff/" + coordsString
    // console.log("WeatherURL: ", darkSkyURL)
    try{
        const response = await axios.get(darkSkyURL)  
        callback(undefined, response)
    }catch(error){
        console.log("Algo se fue alv");
        console.log(error);
        callback(error, {data:null})
    }
}

module.exports = getWeather;