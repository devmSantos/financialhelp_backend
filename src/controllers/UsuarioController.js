const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');


module.exports = {

    async index (request, response) {
        const usuarios = await connection('usuarios').select('*');
        return response.json(usuarios)
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        // const id = email;
        const id = generateUniqueId();

        await connection('usuarios').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });

    }
};



