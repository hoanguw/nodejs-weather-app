const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const templatePath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Hoang Nguyen'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Hoang Nguyen'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Hoang Nguyen'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
       return res.send({
           error: 'You need to have a search term!'
       })
    }

    geoCode(req.query.address, (error, {latitude, longtitude, location} = {})=> {
        if ( error ) {
            return res.send({ error })
        }    
        forecast(latitude, longtitude, (error, forecastData) => {
            if ( error ) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Hoang Nguyen',
        textError: 'Help Article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Hoang Nguyen',
        textError: '404 Not found'
    })
})

app.listen(3000, () => {
    console.log('Your server is up on the port' + port)
})