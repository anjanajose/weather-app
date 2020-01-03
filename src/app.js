const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.set('view engine', 'hbs')
// customize handlebar folder name
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anjana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anjana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anjana',
        msg: 'Help for weather app'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }  
        forecast(latitude,longitude, (error, forecastdata) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        }) 
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'Anjana',
        errorMsg: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'Anjana',
        errorMsg: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})