const connection =  require('../database/connection');

module.exports = {

    async index(request, response){
        const ong = request.headers.authorization;


        const incidents = await connection('incidents')
            .where('ong', ong)
            .select('*');

        return response.json(incidents);
    }
}