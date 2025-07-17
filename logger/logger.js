const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `Time: ${timestamp}, Level: [${level.toUpperCase()}]: Message: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),

    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),

    new winston.transports.File({ 
      filename: 'logs/warn.log', 
      level: 'warn' 
    }),

    new winston.transports.File({ 
      filename: 'logs/info.log', 
      level: 'info' 
    }),

    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

module.exports = logger;
