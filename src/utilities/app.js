const request = require("request")
const geocode = require("./geocode")
const forecast = require("./forecast")
const address = process.argv[2]

geocode(address, (error, {latitude, longtitude,location}) => {
    if (error) {
        return console.log(error)
    } else {
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            } else {
                console.log(location)
                console.log(forecastData)
            }
        })
    }
})
