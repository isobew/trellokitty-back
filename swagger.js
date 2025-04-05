import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'TrelloKitty API',
    version: '1.0.0',
    description: 'Documentação da API REST TrelloKitty',
  },
  servers: [
    {
      url: 'https://v6y4qi4paxpzlgdch7f7reekvy0znrph.lambda-url.us-east-1.on.aws', 
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};

export const swaggerSpec = swaggerJSDoc(options);
