const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const { page = 1 } = request.query;

        const [count] = await connection('incidents')
            .count();

        const incidents = await connection('incidents')
            .join('usuarios', 'usuarios.id', '=', 'incidents.help_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'usuarios.name',
                'usuarios.email',
                'usuarios.whatsapp',
                'usuarios.city',
                'usuarios.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const help_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            help_id,
        });

        return response.json({ id });

    },

    async delete(request, response) {
        const { id } = request.params;
        const help_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('help_id')
            .first();

        if (incident.help_id !== help_id) {
            return response.status(401).json({ error: 'Operação não permitida' })
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },
};



