export const environment = {
    production: false,
    msalConfig: {
        clientId: '92b3194f-8c51-4385-8ea0-cd74a3196882',
        tenantId: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
        authority: 'https://login.microsoftonline.com',
        redirect: 'http://localhost:4200'
    },
    graph: {
        scopes: ['user.read'],
        uri: 'https://graph.microsoft.com/v1.0/me'
    }
};