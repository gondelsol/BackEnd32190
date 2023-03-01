const winston = require('winston');

const createLogger = (env) => {
    if(env == 'PROD'){
        winston.addColors({
            error: 'red',
            warn: 'yellow',
            info: 'cyan',
            debug: 'green'
        });
        return winston.createLogger({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.simple(),
                winston.format.timestamp(new Date()),
                winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
            ),
            transports: [
                new winston.transports.File({
                    colorize: true,
                    filename: './src/log/warn.log',
                    level: "warn"
                }),
                new winston.transports.File({
                    colorize: true,
                    filename: './src/log/error.log',
                    level: "error"
                }),
                new winston.transports.Console({
                    colorize: true,
                    level: "info",
                })
            ],
        })
        
    }
    else {
        return winston.createLogger({
            transports: [
                new winston.transports.File({filename: './src/log/warn.log',level: "warn"}),
                new winston.transports.File({filename: './src/log/error.log',level: "error"}),
                new winston.transports.Console({level: "info"})
            ]
        })
    }
}

module.exports = {
    createLogger
}