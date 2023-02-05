require('dotenv').config()
const argv  = require('./yarg.config');
module.exports = {
	MONGO_URI: process.env.MONGO_URI || '',
	MOTOR: process.env.MOTOR || 'mongo',
	PORT: argv.p || 8080,
	argv,
}