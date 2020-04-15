const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const help_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .where('help_id', help_id)
            .select('*');

        return response.json(incidents);

    }
}