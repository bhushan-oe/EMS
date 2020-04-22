const { createLogger, transports, format } = require('winston');

let logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.splat(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: './logs/access-logs.log',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    // new transports.Console(),
    //This will print same message on console
  ]
});
logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;