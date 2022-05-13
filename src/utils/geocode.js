const request = require('request')

const mapBoxKey = 'pk.eyJ1IjoiaGlsYWsyMjUiLCJhIjoiY2wxem00b2oxMG51aTNpbHBnNjJyNjVnbiJ9.TthCLftQEhxqFCOKIzSquQ'

const geocode = (address, callback) => {
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapBoxKey + '&limit=1'

    request(mapboxUrl, {json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else {
            if (body.features && body.features.length) {
                callback(undefined, {
                    location_str: body.features[0]['place_name'],
                    lat: body.features[0].center[1],
                    long: body.features[0].center[0]
                })
            } else {
                callback('An error occurred retrieving location - check parameter validity', undefined)
            }
        }
    })

}

module.exports = geocode