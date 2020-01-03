const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5qYW5ham9zZSIsImEiOiJjazRycHd0NXE0Y205M25uYXFnYWp1cnQ5In0.2gYTQ7kfm3n4Mjx1w6hcjQ'

    request({url, json: true},(error, { body }) => {
        if(error) {
            callback('Not able to connect to geocoding service', undefined)
        } else if(body.features.length <= 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const latlong = body.features[0].center
            callback(undefined, {
                latitude: latlong[1],
                longitude: latlong[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

