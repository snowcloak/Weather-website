const request = require('phin').unpromisified

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic25vd2Nsb2FrIiwiYSI6ImNrZWVoNjA5bTAxajkyc3FkNTlseDNzaTMifQ.wSUBtKZCQjFQO1pRE3BllA&limit=1'

    request({ url, parse: 'json' }, (error, { body }) => { 
        if (error) {
            callback('Unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
     })
}

module.exports = geocode