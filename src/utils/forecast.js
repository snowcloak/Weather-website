const request = require('phin').unpromisified

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=d29328b945eb026481b1577e9c36b3e8&query=' + latitude + ',' + longitude + '&units=f'

    //url = url (use short hand)
    //response can be desctructure off response
    request( { url, parse: 'json' }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degress out")
        }
    })

}

module.exports = forecast