const connection =  require('../database/connection');

module.exports = {

    async index(request, response){
        const { page = 1} = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.ong', '=', 'incidents.ong')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]); 

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong = request.headers.authorization;

        const [incident] = await connection('incidents').insert({
            title,
            description,
            value,
            ong,
        });

        return response.json({incident})
    },

    async delete(request, response){
        const {incident} = request.params;
        const ong = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('incident', incident)
            .select('ong')
            .first();

        if(incidents.ong != ong){
            return response.status(401).json({error: 'Operation not permitted'});
        }

        await connection('incidents').where('incident', incident).delete();

        return response.status(204).send();
    }
}