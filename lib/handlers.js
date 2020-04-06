const { isValidDate } = require('./helpers')

// Instantiate the handlers object
const handlers = {};

handlers.ping = (req, callback) => {
    // Check if data are provided and validate them
    let name = req.searchParams['name'] || req.payload.name;
    name = typeof name === 'string' && name.length > 0 ? name : false;

    let age = req.searchParams['age'] || req.payload.age;
    age = typeof parseInt(age) === 'number' && parseInt(age) > 0 ? parseInt(age) : false;

    let location = req.searchParams['location'] || req.payload.location;
    location = typeof location === 'string' && location.length > 0 ? location : false;

    if (name && age && location) {
        callback(200, { 'message': `Hello ${name}, you are ${age} years old and live in ${location}.` });
    } else {
        callback(400, { 'status': 'Invalid Inputs' })
    }
}

handlers.getUserData = (req, callback) => {
    // Check if data are provided and validate them
    let name = req.searchParams['name'] || req.payload.name;
    name = typeof name === 'string' && name.length > 0 ? name : false;

    if (name) {
        callback(200, { 'message': `Welcome to your account area ${name}.` })
    } else {
        callback(400, { 'message': 'Invalid Inputs' })
    }
}

handlers.dayFromDate = (req, callback) => {
    let date = req.searchParams['date'] || req.payload.date;
    date = typeof date === 'string' && date.length > 0 ? new Date(date) : false;
    const parsedDate = isValidDate(date);

    if (parsedDate) {
        // Get the day
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[date.getDay()];

        callback(200, { 'message': `${day}` })
    } else {
        callback(400, { 'message': 'Invalid Inputs' })
    }
}

handlers.notFound = (req, res, callback) => {
    // Always return 200
    callback(404, { 'status': 'not found' });
}

module.exports = handlers;