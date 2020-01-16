require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const botMessage = process.env.BOT_MESSAGE;
const recipientNumber = process.env.RECIPIENT_NUMBER;

const Twilio = require('twilio');
const client = new Twilio(accountSid, authToken);

exports.handler = function(event, context, callback) {

    client.messages
        .create({
            from: twilioPhoneNumber,
            to: recipientNumber,
            body: botMessage
        })
        .then(() => callback(null, {
            statuscode: 200,
            body: 'Created!'
        }))
        .catch(err => {
            console.error(err)
            return callback(null, {
                statusCode: error.status,
                body: JSON.stringify({
                    message: error.message,
                    error: error,
                })
            })
        })
};