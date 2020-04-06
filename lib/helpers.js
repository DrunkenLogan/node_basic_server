// Instantiate the helpers Object

const helpers = {};

// Parse JSON Object without throwing in case of errors
helpers.parseJsonToObject = json => {
    try {
        const obj = JSON.parse(json);
        return obj;
    } catch {
        return {};
    }
};

helpers.isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
}

module.exports = helpers;