const http = require('http');
const { StringDecoder } = require('string_decoder');
const { parseJsonToObject } = require('./lib/helpers');
const handlers = require('./lib/handlers');


// Instantiate the server object
const domain = 'http://localhost:'
const PORT = 3000;
const decoder = new StringDecoder('utf8');

// Create the http server
const httpServer = http.createServer((req, res) => {
    // Get the req url from the request
    const reqUrl = new URL(domain + req.url);

    // Get the path
    const path = reqUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/, '');

    // Get the method
    const method = req.method;

    // Get the headers
    const headers = req.headers;

    // Get the search Parameters
    const searchParams = {};

    reqUrl.searchParams.forEach((value, key) => {
        searchParams[key] = value;
    });

    // Get the payload
    let buffer = '';

    req.on('data', data => buffer += decoder.write(data));

    req.on('end', data => {
        buffer += decoder.end(data);
        console.log(buffer);

        // Instantiate the reqObject
        const reqObj = {
            path: trimmedPath,
            method: method,
            headers: headers,
            searchParams: searchParams,
            payload: parseJsonToObject(buffer)
        };

        console.log(reqObj.searchParams);

        const chosenHandler = router[reqObj.path] ? router[reqObj.path] : router.notFound;

        chosenHandler(reqObj, (statusCode, payload) => {
            const stringPayload = JSON.stringify(payload)

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(stringPayload);
        })
    });
});

// Instantiate the req router object
const router = {
    'ping': handlers.ping,
    'api/getday': handlers.dayFromDate,
    'account': handlers.getUserData,
    'notFound': handlers.notFound
}

// Listen
httpServer.listen(PORT, () => {
    console.log(`Listening on port: ${3000}`);
})
