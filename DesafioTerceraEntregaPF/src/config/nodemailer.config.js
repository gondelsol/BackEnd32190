const nodemailer  = require('nodemailer');
const global = require('./globals');

const config = nodemailer.createTransport({
    service: global.nodemailer.service,
    host: global.nodemailer.host,
    port: global.nodemailer.port,
    auth: {
        user: global.nodemailer.auth.user,
        pass: global.nodemailer.auth.pass
    }
});
module.exports = config;