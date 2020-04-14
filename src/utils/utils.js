const twoDecimal = x => Math.round(x * 100) / 100
const f2c = f => twoDecimal((f - 32) * 5 / 9);
const getWeather = require('./weather')

function handleDecodeResponse(req, res, error, data) {
    if (error)
        res.send({
            code: 503,
            message: 'Unable to contact the decoding service. Try again later',
            data: null
        })
    else if (data.features.length == 0)
        res.send({
            code: 422,
            message: `Unable to decode "${req.query.city}", try another one`,
            data: null
        })
    else {
        const { geometry } = data.features[0]
        getWeather(geometry.coordinates.reverse().join(','), (error, { data }) => { handleWeatherResponse(req, res, error, data) })
    }
}

function handleWeatherResponse(req, res, error, data) {
    if (error)
        res.send({
            code: 503,
            message: 'Unable to contact the weather service. Try again later',
            data: null
        })
    else
        if (data.code && data.code != '200')
            res.send({
                code: 422,
                message: 'Unable to contact the weather service. Try again later',
                data: null
            })
        else
        res.send({
            code: 200,
            message: 'Here it is',
            data: {
                temperature:{
                    cl: f2c(data.currently.temperature),
                    fa: data.currently.temperature
                },
                thermalSensation:{
                    cl: f2c(data.currently.apparentTemperature),
                    fa: data.currently.apparentTemperature
                },
                humidity: data.currently.humidity,
                windSpeed: data.currently.windSpeed,
                icon: data.currently.icon
            }
        })
}

module.exports = {
    twoDecimal,
    f2c,
    handleDecodeResponse
}

