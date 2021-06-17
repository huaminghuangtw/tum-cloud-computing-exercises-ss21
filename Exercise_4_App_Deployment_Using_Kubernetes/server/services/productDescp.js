/*
 * Import the seneca package
 */
const seneca = require('seneca')();
const Promise = require('bluebird');
const config = require('../config');

/*
 * Convert act to Promise
 */
const act = Promise.promisify(seneca.client({ host: config.product_descp_service.host, port: config.product_descp_service.port }).act, { context: seneca });

/*
 * Define Service Method
 */
const GET_PRODUCT_URL = { role: 'product', cmd: 'getProductURL' };
const GET_PRODUCT_NAME = { role: 'product', cmd: 'getProductName' };

/*
 * Call Service Method
 */
const getProductURL = function(productId) {
    return act(Object.assign({}, GET_PRODUCT_URL, { productId }));
};
const getProductName = function(productId) {
    return act(Object.assign({}, GET_PRODUCT_NAME, { productId }));
};

module.exports = {
    getProductURL,
    getProductName
};
