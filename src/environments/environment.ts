export const environment = {
  msalConfig: {
    clientId: '3ecdf6fc-e97b-4fec-87ab-827a54f6d471',
    tenantId: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
    //redirect: 'https://e051-177-121-251-127.ngrok-free.app' // use this for production
    //redirect: 'https://internal-information-management.vercel.app' // use this for local
    redirect: 'http://localhost:4200'
  },
  graph: {
    uri: 'https://graph.microsoft.com/v1.0/me',
    scopes: ['user.read']
  },
  //urlApi: 'https://782d-2804-214-8593-5218-60d9-db6-d9fd-9734.ngrok-free.app'
  // urlApi: 'http://localhost:5171'
  urlApi: 'https://mgn.dsa.org.br'
};
