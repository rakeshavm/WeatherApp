const request = require('request')

const forecast = (longitude, latitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/3b3b8f4de50abe2bba6960bc99cc0756/' + latitude +',' + longitude +'?units=si'
    request({ url, json: true},(error,{body})=>{
    if(error)
        callback('Network Connection unavailable', undefined)
    else if(body.error)
        callback(body.error, undefined)
    else
        callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    })
}

module.exports = forecast