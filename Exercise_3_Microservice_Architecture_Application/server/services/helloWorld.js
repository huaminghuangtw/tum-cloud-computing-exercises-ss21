/*
 * Import the seneca package
 */
const seneca = require('seneca')();
const Promise = require('bluebird');
const config = require('../config');

/*
 * Convert act to Promise
 */
const act = Promise.promisify(seneca.client({ host: config.helloWorld_service.host, port: config.helloWorld_service.port }).act, { context: seneca });

/*
 * Define Service Method
 */
const SAY_WELCOME = { role: 'helloWorld', cmd: 'Welcome' };

/*
 * Call Service Method
 */
const sayWelcome = function(name) {
    return act(Object.assign({}, SAY_WELCOME, { name }));
};

module.exports = {
    sayWelcome
};
