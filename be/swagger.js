const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Docs',
            version: '1.0.0',
        },
        host: 'port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app',
        basePath: '/'
    },
    apis: ['*.js', 'routes/*.js', 'routes/*.js', 'routes/auth/*.js', 'routes/Class/*.js', 'routes/question/*.js']
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};