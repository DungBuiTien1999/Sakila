const db = require('../utilis/db');

module.exports = {
    all() {
        return db('country');
    },

    async getById(id) {
        const country = await db('country').where('country_id', id);
        if(country.length === 0) {
            return null;
        }
        return country[0];
    },

    add(country) {
        return db('country').insert(country);
    },

    async updateById(country, id) {
        const ret = await db('country').where('country_id', id).update(country);
        return ret;
    },

    async deleteById(id) {
        const ret = await db('country').where('country_id', id).del();
        return ret;
    }
}