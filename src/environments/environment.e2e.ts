export const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: '92b3194f-8c51-4385-8ea0-cd74a3196882',
            authority: 'https://login.microsoftonline.com/common'
        }
    },
    apiConfig: {
        scopes: ['user.read'],
        uri: 'https://graph.microsoft.com/v1.0/me'
    }
};