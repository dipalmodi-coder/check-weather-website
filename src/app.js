// Requires path module from NodeJS
const path = require('path');

// Requires express library
const express = require('express');
const hbs = require('hbs');

// Requires forecast API
const forecast = require('./utils/forecast');

// Create an app variable with express function.
// Use the app variable to call various express features.
const app = express();
// Heroku will assign value to this env. variable
// Or default value as 3000
const port = process.env.PORT || 3000;

// Set up path configs for public and views folders
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsFolderPath = path.join(__dirname, '../templates/views');
const hbsPartialsPath = path.join(__dirname, '../templates/partials');

// Set HandleBars as View Engine
app.set('view engine', 'hbs');
// Set Views folder path to render pages
app.set('views', viewsFolderPath);
// Set Handle Bars Partials path
hbs.registerPartials(hbsPartialsPath);

// Instruct app to use static files from a dir.
app.use(express.static(publicDirectoryPath));

// Set up the request mapping for root
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dipal Modi'
    })
});

// Set up the request mapping for about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dipal Modi'
    })
});

// Set up the request mapping for help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Dipal Modi',
        helpText: 'This is some useful help article!'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address!'});
        return;
    }
    
    forecast.getForecast(req.query.address, (error, data) => {
        // In case of any error, send err message
        if (error) {
            res.send({
                // Short form of error: error 
                error
            });
            return;
        }

        res.send({
            name: 'Dipal Modi',
            address: req.query.address,
            forecast: data
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Dipal Modi',
        title: '404',
        errMsg: 'Requested Help article was not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Dipal Modi',
        title: '404',
        errMsg: 'Requested page was not found!'
    });
});

app.listen(port, () => {
    console.log('Server started on port ' + port + '!');
});