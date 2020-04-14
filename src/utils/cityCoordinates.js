const axios = require("axios");
const mapBoxToken = "pk.eyJ1Ijoiam9nYWRldiIsImEiOiJjankzOW82aHEwZm9vM21zNmhsdGl4YWtuIn0.r6Byq4BsB-M_MvvggLj6kQ"

async function getCityCoords(cityQ, callback) {
    let mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cityQ)}.json?access_token=${mapBoxToken}`
    // console.log(mapBoxURL);
    try {
        const resp = await axios.get(mapBoxURL);
        callback(undefined, resp);
    } catch (error) {
        console.error('COORDS:', error);
        callback(error, {data:null})
    }

}

module.exports = getCityCoords