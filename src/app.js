const path = require('path')
const express = require('express')
const hbs = require('hbs')

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
    res.send({
        forcast: 'It is clear. 55F',
        location: "Foster city, CA, United States"
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