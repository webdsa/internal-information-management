export const environment = {
    msalConfig: {
        clientId: '3ecdf6fc-e97b-4fec-87ab-827a54f6d471',
        tenantId: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
        // redirect: 'https://8616-177-39-104-48.ngrok-free.app' // use this for production
        redirect: 'http://localhost:4200' // use this for local
    },
    graph: {
        uri: 'https://graph.microsoft.com/v1.0/me',
        scopes: ['user.read']
    },
    urlApi: 'https://e4b4-179-89-244-234.ngrok-free.app'
    // urlApi: 'http://localhost:5171'

};
