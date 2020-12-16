'use strict';

const crypto = require('crypto');
const postgresClient = require('./connections/PostgresConnection')('production');

postgresClient.authenticate()
.then(() => console.log('Database Connected Successfully'))
.catch(() => console.log('Database Connection Failed'));

const Controller = require('./controller')(postgresClient);

module.exports.app = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const MagicWord = process.env.MAGIC_WORD;
        const clientProfileController = Controller.clientProfileController;
    
        const clientEmail = event.body.client_email;
        const clientName = event.body.client_name;

        const clientEmailSalted = clientEmail + "" + MagicWord;
        const clientId = crypto.createHash('sha256').update(clientEmailSalted).digest('base64');

        await clientProfileController.updateClientName(clientId, clientName);
     
        const response = {
            MESSAGE: 'DONE',
            RESPONSE: 'Client Username Updated Successfully!',
            CODE: 'CLIENT_UPDATED_SUCCESSFULLY'
        };

        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };

    } catch(err) {
        console.error(`ERR: ${JSON.stringify(err.message)}`);

        const response = {
            ERR: err.message,
            RESPONSE: 'Client Username Upload Failed!',
            CODE: 'CLIENT_UPDATION_FAILED'
        };

        return {
            statusCode: 400,
            body: JSON.stringify(response)
        };
    }
}