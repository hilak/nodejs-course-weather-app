const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public', )
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath ))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hila K'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Hila K'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Hila K'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = req.query.address;
    geocode (address, (error, {lat, long, location_str} = {}) => {
        if (error) {
            return res.send({
                error: error,
            })
        }

        forecast (lat, long, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error,
                })
            }

            res.send({
                location: location_str,
                address: req.query.address,
                weather: forecastData
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Error',
        message: 'Help article not found',
        name: 'Hila K'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        message: 'Page not found',
        name: 'Hila K'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})