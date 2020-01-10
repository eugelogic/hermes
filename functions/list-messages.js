require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const Twilio = require('twilio');
const client = new Twilio(accountSid, authToken);

exports.handler = function(event, context, callback){

    client.messages
    .list()
    .then(messages => {
        return callback(null, {
            statusCode: 200,
            // Uncomment headers to test locally
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            // },
            body: JSON.stringify({
              data: messages
            })
          })
        }).catch(err => {
            console.error(err)
            return callback(null, {
                statusCode: error.status,
                body: JSON.stringify({
                    message: error.message,
                    error: error,
                })
            })
        })

}