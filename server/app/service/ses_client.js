const AWS = require('aws-sdk');
const logger = require('../../logs/util/logger')
const config = require("../../config");

AWS.config.update({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secret,
    region: config.aws.ses.region
});

const ses = new AWS.SES({apiVersion: '2010-12-01'});

const sendEmail = (to, from, subject, message) => {
       const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: message
                },
             },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        ReturnPath: from ? from : config.aws.ses.from.default,
        Source: from ? from : config.aws.ses.from.default,
    };

    ses.sendEmail(params, (err, data) => {
        if (err) {       
            return logger.error("%o %o",err, err.stack);                
        } else {
            logger.info("Email sent. %O ", data)
        }
    });
};

module.exports = {sendEmail};
