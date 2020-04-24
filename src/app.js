
const path = require('path'); 
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Viren Baid'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Viren Baid'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Viren Baid',
        helpText: 'This is some help text.'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({error: 'address missing in the query parameter'});
    }
    geocode(address, (error, {location, latitude, longitude} = {}) => {
        error 
        ? res.send({error}) 
        : forecast(latitude, longitude, (error, forecastData) => { 
            error 
            ? res.send({error}) 
            : res.send({searchTerm: address, location, forecast: forecastData}) 
        })
    }) 
})


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Uh Oh! 404 Error.',
        name: 'Viren Baid',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Uh Oh! 404 Error.',
        name: 'Viren Baid',
        errorMessage: 'Page not found'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});