const db = require('../utilis/db');

module.exports = {
    all() {
        return db('city');
    },

    async getCityById(id) {
        const city = await db('city').where('city_id', id);
        if(city.length === 0){
            return null;
        }
        return city[0];
    },

    add(city) {
        return db('city').insert(city);
    },

    async updateCityById(newCity, id) {
        const ret = await db('city').where('city_id', id).update(newCity);
        return ret;
    },

    async deleteById(id) {
        const ret = await db('city').where('city_id', id).del();
        return ret;
    }
}