const path = require('path')
const express = require('express')
const hbs = require("hbs")
const request = require("request")
const geocode = require("./utilities/geocode")
const forecast = require("./utilities/forecast")


const app = express()
const port=process.env.PORT || 3000

//  Define Paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, ("../templates/views"))
const partialsPath = path.join(__dirname, ("../templates/partials"))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Set-up Pages
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ahmet Ramazan TEMEL'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ahmet Ramazan TEMEL'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ahmet Ramazan TEMEL',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "You must send an address" })
    } else {
        geocode(req.query.address, (error, { latitude, longtitude, location }) => {
            if (error) {
                return res.send(error)
            } else {
                forecast(latitude, longtitude, (error, forecastData) => {
                    if (error) {
                        return res.send(error)
                    } else {
                        res.send({
                            forecast: forecastData,
                            location,
                            summary: `It is currently ${forecastData.currentTemp} degree. Rain chance is %${forecastData.rainChance}`,
                            address: req.query.address
                        }

                        )
                    }
                })
            }
        })
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})