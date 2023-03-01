const { createLogger } = require('../config/logger.config');
const logger = createLogger('PROD');
// Handlebars helpers

module.exports = {
    multiply: (multiplicand, multiplier) => {
        return multiplicand * multiplier;
    },
    formatNumber: (number) => {
        return number.toLocaleString();
    },
    calcTotal: (products) => {
        let total = 0;
        total = products.reduce((a, b) => a + ( b.price * b.stock), 0);
        return total;
    }
}