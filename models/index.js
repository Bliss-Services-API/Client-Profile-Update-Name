module.exports = postgresClient => {
    const ClientCredentialModel = require('./ClientCredentialModel')(postgresClient);

    return {
        ClientCredentialModel
    };
}