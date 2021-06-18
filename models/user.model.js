const db = require('../utilis/db');

module.exports = {
    // all() {
    //     return db('film');
    // },

    // async getFilmById(id) {
    //     const film = await db('film').where('film_id', id);
    //     if(film.length === 0) {
    //         return null;
    //     }
    //     return film[0];
    // },

    async getUserByUsername(username) {
        const user = await db('users').where('username', username);
        if(user.length === 0) {
            return null;
        }
        return user[0];
    },

    add(user) {
        return db('users').insert(user);
    },

    patchRFToken(id, rfToken) {
        return db('users').where('id', id).update('rfToken', rfToken);
    },

    async isValidRFToken(id, rfToken) {
        const list = await db('users').where('id', id).andWhere('rfToken', rfToken);
        if(list.length > 0){
            return true;
        }
        return false;
    }

    // async deleted(id) {
    //     const ret = await db('film').where("film_id", id).del();
    //     return ret;
    // },

    // async update(id, newFilm) {
    //     const ret = await db('film').where('film_id', id).update(newFilm);
    //     return ret;
    // }
}