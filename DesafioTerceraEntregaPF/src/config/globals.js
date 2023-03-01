require('dotenv').config();

module.exports = {
	MONGO_URI: process.env.MONGO_URI || '',
	MOTOR: process.env.MOTOR || 'mongo',
	PORT: process.env.PORT ? process.env.PORT : argv.port ? argv.port : 8080,
	emailAdmin: process.env.EMAIL_ADMIN || '',
	app: {
		persistence: process.env.PERSISTENCE || 'mongo',
	},
	nodemailer: {
		service: process.env.NODEMAILER_SERVICE || 'gmail',
		host: process.env.NODEMAILER_HOST || 'smtp.gmail.com',
		port: process.env.NODEMAILER_PORT || 587,
		auth: {
			user: process.env.NODEMAILER_USER || 'alex.nodemailer.cornejo@gmail.com',
			pass: process.env.NODEMAILER_PASS || 'bvzehkrhbnhaqghs',
		}
	}
}