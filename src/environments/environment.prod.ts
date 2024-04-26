export const environment = {
    msalConfig: {
        clientId: '3ecdf6fc-e97b-4fec-87ab-827a54f6d471',
        tenantId: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
        redirect: 'http://localhost:4200'
    },
    graph: {
        uri: 'https://graph.microsoft.com/v1.0/me',
        scopes: ['user.read']
    },
    urlApi: 'http://localhost:5171'
}