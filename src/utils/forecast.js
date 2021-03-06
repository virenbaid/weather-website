const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a58b682e1684d91ce8f6b18a8c7e755e&query=` + lat + `,` + long + `&units=m`;
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback(`Unable to connect to the weather service`, undefined);
        }
        else if (body.error) {
            callback(`Unable to find location`, undefined);
        }
        else {
            body.current.temperature === body.current.feelslike
            ? callback(undefined, `${body.current.weather_descriptions[0]}. Current temperature is ${body.current.temperature}.`)
            : callback(undefined, `${body.current.weather_descriptions[0]}. Current temperature is ${body.current.temperature}, but it feels like ${body.current.feelslike}.`)
        }
    });
}

module.exports = forecast;