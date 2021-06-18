const db = require('../utilis/db');
// const film_actorModel = require('./film_actor.model');

module.exports = {
    all() {
        return db('actor');
    },

    async getActorById(id) {
        const ret = await db('actor').where("actor_id", id);
        if(ret.length === 0){
            return null;
        }
        return ret[0];
    },

    add(actor) {
        return db('actor').insert(actor);
    },

    deleteById(id) {
        // const ret1 = film_actorModel.deleteByIdActor(id);
        // console.log(ret1);
        const ret2 = db('actor').where('actor_id', id).del();
        console.log(ret2);
        return ret2;
    },

    async updateById(newActor, id) {
        const ret = await db('actor').where('actor_id', id).update(newActor);
        return ret;
    }
};