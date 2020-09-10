const request = require('phin').unpromisified

const access_key = 'd29328b945eb026481b1577e9c36b3e8'

const forecast = (latitude, longitude, units='f', callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + latitude + ',' + longitude + '&units=' + units

    //url = url (use short hand)
    //response can be desctructure off response
    request( { url, parse: 'json' }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, (units==='f') ? "It is  " + body.location.localtime + " there. " + body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + "°F out. It feels like " + body.current.feelslike + "°F out." : "It is  " + body.location.localtime + " there. " + body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + "°C out. It feels like " + body.current.feelslike + "°C out.")
        }
    })

}

module.exports = forecast