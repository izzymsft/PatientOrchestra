
// Loading the HTTP Request Promise Library
const rp = require('request-promise');

// Downstream Function endpoint
const functionEndpoint = 'https://patientvitalscore.azurewebsites.net/api/ComputeDiastolic';

// Starting a Synchronous Azure Function Declaration
module.exports = function (context, req) {
    
    context.log.info('Temperature Proxy received a request');

    // Configuring Request Options
    var requestOptions = {
        timeout : 30 * 1000, // the number of milliseconds to wait for a server to send response headers (and start the response body) before aborting the request
        method: 'POST', // The HTTP request method expected for this request
        uri: functionEndpoint, // the URL for the downstream http trigger function
        body: req.body, // entity body for PATCH, POST and PUT requests. Must be a Buffer, String or ReadStream. If json is true, then body must be a JSON-serializable object
        qs: { // object containing querystring values to be appended to the uri
            city: 'Atlanta', 
            state: 'GA',
            country : 'USA'
        },
        headers: { // http request headers to downstream function
            'User-Agent': 'JavaScript Proxy',
            'Content-Type': 'application/json'
        },
        json: true, // Automatically stringifies the body to JSON
        simple: true, // a boolean to set whether status codes other than 2xx should also reject the promise
        resolveWithFullResponse : false, // a boolean to set whether the promise should be resolved with the full response or just the response body
        transform2xxOnly: false //  a boolean to set whether the transform function is applied to all responses or only to those with a 2xx status code
    };

    rp(requestOptions)
    .then(function (parsedResponseBody) { // if successful
        // Python function call succeeded
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            isRaw : true,
            body: parsedResponseBody
        };
    })
    .catch(function (errorResponse) { // if something went wrong
        // Python function call ended with an error
        context.res = {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            isRaw : true,
            body: errorResponse
        };

    }).finally(function () {
        // any final clean up happens here, regardless of whether it was a success or failure
        context.done();
    });
};