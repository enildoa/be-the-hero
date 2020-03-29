const connection =  require('../database/connection');

module.exports = {
    async create(request, response){
        const {ong} = request.body;

        const ongs = await connection('ongs')
            .where('ong', ong)
            .select('name')
            .first();

        if(!ongs){
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        return response.json(ongs);
    }
}