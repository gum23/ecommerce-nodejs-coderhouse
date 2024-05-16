import winston from 'winston';
import config from '../config.js';

const customLevelOptions = {
    levels: {
        fatal: 1,
        error: 2,
        warning: 3,
        info: 4,
        http: 5,
        debug: 6
    },
    colors: {
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "green",
        http: "blue",
        debug: "grey"
    }
};

winston.addColors(customLevelOptions.colors);

const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "./errors.log",
            level: "warning",
            format: winston.format.simple()
        })
    ]
});

const prodLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({level: "warning"}),
        new winston.transports.File({filename: "./errors.log", level: "http"})
    ]
});

export const addLogger = (req, res, next) => {

    if (config.environment == "production") {
        req.logger = prodLogger;

        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);
        req.logger.fatal(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

    } else {
        req.logger = devLogger;

        req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`);

    }
    next();
}