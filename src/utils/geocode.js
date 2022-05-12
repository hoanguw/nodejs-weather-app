const request = require('request')

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaG5ndXllbnV3IiwiYSI6ImNsMmRyeXRhcTAzZGszYnJ3azJlcWNzZDgifQ.PN3d0do-WR04WP8suWdvzw&limit=1"
    request( {url, json: true}, (error, {body}) => {
        if ( error ) {
            callback('Cannot connect to GeoLocation service', undefined)
        } else if ( body.features.length === 0 ) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })  
}

module.exports = geoCode