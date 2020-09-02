const request = require('postman-request');

/**
 * 
 * @param {*} location 
 * @param {*} callback(error, data)
 */
const getForecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current';
    const units = 'f';
    const access_key = '894b357133db5b28d145ca6441762d09';
    const query = location;
    
    request({
        // Using short hand properties, name of const is same as object properties
        // url: url can be replaced by just url in the request object
        url,
        qs: {
            access_key,
            query,
            units
        },
        method: 'GET',
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to weather service, please check your internet connection and try again!", undefined);
        } else if (response.body.error !== undefined) {
            callback(response.body.error.info, undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                condition: body.current.weather_descriptions,
                location: body.location.name + ', ' + body.location.country,
            });
        }
    });
};

module.exports = {
    getForecast: getForecast
}