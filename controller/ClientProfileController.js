'use strict';

/**
 * 
 * Controller for Handling Operations related to the Transient Token.
 * 
 * @param {Sequelize Object} postgresClient Client to use for Postgres Database Operations
 * 
 */
module.exports = (postgresClient) => {
    
    //Importing Modules
    const model = require('../models');

    //Initializing Variables
    const Models = model(postgresClient);
    const clientCredentialModel = Models.clientCredentialModel;

    const updateClientName = async (clientId, clientName) => {
        await clientCredentialModel.update(
            { client_name: clientName },
            { where: { client_id: clientId }}
        );
    };

    return {
        updateClientName
    };
}