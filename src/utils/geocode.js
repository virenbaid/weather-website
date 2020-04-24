const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmlyZW5iYWlkIiwiYSI6ImNrOWFvcjlwOTBhYTAzanA3ZWtmY3BkYnkifQ.8nDN94X-H9H3zpAS6ZpjPQ&limit=1`
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback(`Unable to connect to the geocoding service`, undefined);
        } else if ((body.features === undefined) || (body.features.length === 0)) {
            callback(`Unable to find location`, undefined);
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }

    });
}

module.exports = geocode;