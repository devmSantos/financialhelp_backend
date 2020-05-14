const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { celebrate, Segments, Joi } = require('celebrate');

const UsuarioController = require('./controllers/UsuarioController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

//Rota para login na aplicação
routes.post('/sessions', SessionController.create);

//Rota para listagem dos usuarios
routes.get('/usuarios', UsuarioController.index);

//Rota pra crição dos 
routes.post('/usuarios', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    }),
}), UsuarioController.create);

//Rota para alguma cooisa
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

//Rota para listagem dos incidentes
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), IncidentController.index);

//Rota para criação dos incidentes
routes.post('/incidents', IncidentController.create);

//Rota para deletar os incidentes
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);



module.exports = routes;