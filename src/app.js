//directory library
const path = require('path')
//web server library
const express = require('express')
//handlebars library
const hbs = require('hbs')
const { title } = require('process')

//geocode
const geocode = require('./utils/geocode')
//forecast
const forecast = require('./utils/forecast')
const { response } = require('express')

//create an instance of the express module
const app = express()
const port = process.env.PORT || 3000

/* define paths for Express config
here it is (/Users/miguelzeng/Desktop/Node-App/web-server/public)
.. = go up a directory */
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPaths = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPaths)
hbs.registerPartials(partialsPath)

/*  set up static directory to serve

    express.static(root, [options])
    The root argument specifies the root directory from which to serve static assets
    
    app.use mounts the static server*/
app.use(express.static(publicDirectoryPath))

//
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Miguel Zeng'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Miguel Zeng'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some help text',
        title: 'Help',
        name: 'Miguel Zeng'
    })
})

app.get('/weather', (req, res) => {
    /*
    req.query is everything after the question mark
    eg https:weather.com/video?location=Philadelphia&units=f
    the parameters are location = Philadelphia and units=f 
    */
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = req.query.address;
    //geocode takes in an address and a callback function
    //the callback function takes in error and object
    //we can destructure the elements from the object
    //{ lat, long, loc } = { } where the assignment is default parameters
    geocode(address, (error, { latitude, longitude, location} = { }) => {
        //check if geocode runs into an error ie check that the locaiton exists
        if (error) {
            return res.send({ error })
        }

        //the two functions communicate
        //forecast takes in a callback
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Miguel Zeng',
        errorMsg: 'Help article not found'
    })
})

//404 page must come last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Miguel Zeng',
        errorMsg: 'Page not found'
    })
})

//server
app.listen(port, () => {
    console.log('Sever is up on port ' + port)
})