const db = require('../utilis/db');

module.exports = {
    deleteByIdActor: async id_actor => await db('film_actor').where('actor_id', id_actor).del(),
}