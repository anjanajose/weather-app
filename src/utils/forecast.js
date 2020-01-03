const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/684d856c7f53d0cfabaef99eb4a0da0b/'+latitude+','+longitude

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Cannot connect to weather service', undefined)
        } else if(body.error) {
            callback('Error processing weather forcast', undefined)
        } else {
            const currently = body.currently
            const daily = body.daily
          
            callback(undefined, daily.data[0].summary+' It is currently '+currently.temperature+' degrees out. There is a '+currently.precipProbability+'% chance of rain.')
        }
    })
}

module.exports = forecast