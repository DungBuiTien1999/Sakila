const db = require('../utilis/db');

module.exports = {
    all() {
        return db('category');
    },

    async getById(id) {
        const cat = await db('category').where('category_id', id);
        if(cat.length === 0) {
            return null;
        }
        return cat[0];
    },

    add(cat) {
        return db('category').insert(cat);
    },

    async updateById(cat, id) {
        const ret = await db('category').where('category_id', id).update(cat);
        return ret;
    },

    async deleteById(id) {
        const ret = await db('category').where('category_id', id).del();
        return ret;
    }
}