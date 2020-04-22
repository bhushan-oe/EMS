const morgan = require('morgan');
const logger = require('./logger');
const { uuid } = require('uuidv4');

 morgan.token('id', function getId (req) {
  return `EMS[${uuid()}]:`
})

logger.stream = {
  write: message => logger.error(message.substring(0, message.lastIndexOf('\n')))
};

module.exports = morgan(':id :method :url :status :response-time ms - :res[content-length]', 
{ skip: function(req, res) { return res.statusCode < 400 }, 
stream: logger.stream })

