const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');


const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());


    





const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Customer API',
            description: 'Information',
            contact: {
                name: 'Matheu Santos',
            },
            servers:["http://localhost:3334"]
        }
    },
    apis: ['./routes/*.js']
    //apis: ['app.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /incidents:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */

module.exports = app;

