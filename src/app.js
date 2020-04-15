const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const decodeCoords = require('./utils/cityCoordinates')
const utils = require('./utils/utils')

// Constants and paths
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Heroku port, defaults to 3000
const PORT = process.env.PORT || 3000
// Handlebars configuration

app.set('view engine', 'hbs');
app.set('views', viewsPath)
app.use(express.static(path.join(__dirname, '../public')));
hbs.registerPartials(partialsPath)

// Express magique

app.get('', (req, res) => {
    res.render('index', { title: 'Weather', name: 'Jorge Garcia' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About section', name: 'Jorge Garcia' })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help! I fucked this up',
        message: 'Please contact support',
        name: 'Jorge Garcia'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.city) {
        res.render('errorPage', {
            title: 'Weather',
            subtitle: 'No place provided',
            message: 'You need to send ?city=YOUR_CITY in order to lookup the weather'
        })
    } else {
        decodeCoords(req.query.city, (error, { data }) => {utils.handleDecodeResponse(req,res,error,data)})
    }
})

app.get('/help/*', (req, res) => {
    res.render('helpNF', { title: 'Help page', name: 'Jorge Garcia' })
})

app.get('*', (req, res) => {
    res.render('fourOfour', { name: 'Jorge Garcia' })
})

app.listen(PORT, () => {
    console.log("App is now running", PORT);
})