const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expense Manager API',
      version: '1.0.0',
      description: 'API documentation for Expense Manager'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/v1/*.js', './index.js'],  // paths to your annotated files
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;

