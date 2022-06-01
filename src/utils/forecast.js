const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=7f3229bc5f6fc1c06cd34f3ae257284b&query=" + latitude + "," + longtitude + "&units=m"
    request({url, json: true }, (error, {body}) => {
        if ( error ) {
            callback('We cannot connect to forecase service', undefined)
        } else if ( body.error ) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + ". It's currently " + body.current.temperature + " Celsius degree out. It feels like " + body.current.feelslike + " degree out. Observation time is at " + body.current.observation_time)
        }
    })   
}

module.exports = forecast