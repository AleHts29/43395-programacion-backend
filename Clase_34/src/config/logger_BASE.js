import winston from "winston";


//Creating our logger:
const logger = winston.createLogger({
    //Declare transports:
    transports: [
        new winston.transports.Console({ level: "http" }),
        new winston.transports.File({ filename: './errors.log', level: 'warn' })
    ]
});

//Declare a middleware:
export const addLogger = (req, res, next) => {
    req.logger = logger;

    // req.logger.debug("HOLA")
    req.logger.warn(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

    req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    next();
};