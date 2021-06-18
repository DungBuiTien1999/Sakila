const db = require('../utilis/db');

module.exports = {
    all() {
        return db('film');
    },

    async getFilmById(id) {
        const film = await db('film').where('film_id', id);
        if(film.length === 0) {
            return null;
        }
        return film[0];
    },

    add(film) {
        return db('film').insert(film);
    },

    async deleted(id) {
        const ret = await db('film').where("film_id", id).del();
        return ret;
    },

    async update(id, newFilm) {
        const ret = await db('film').where('film_id', id).update(newFilm);
        return ret;
    }
}