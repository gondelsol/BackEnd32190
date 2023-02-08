require('dotenv').config()
const argv  = require('./yarg.config');
console.log(argv.p);
module.exports = {
	MONGO_URI: process.env.MONGO_URI || '',
	MOTOR: process.env.MOTOR || 'mongo',
	PORT: argv.p || 8080
}