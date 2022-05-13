const request = require('request')

const weatherstackKey = '920079807b91ca8c0cf5b1f2481a8a24'

const forecast = (lat, long, callback) => {
    apiUrl = 'http://api.weatherstack.com/current?access_key=' + weatherstackKey + '&query=' + lat + ',' + long + '&units=m'

    request(apiUrl, {json: true}, (error, { body } = {}) => {
        if (error) {
            callback('An error occurred - weather could not be retrieved', undefined)
        }
        else {
            if (body.error) {
                callback('Error occurred: ' + body.error.info, undefined)
            } else {
                callback(undefined, body.current.weather_descriptions[0] + `. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees.`)
            }
        }

    })
}

module.exports = forecast