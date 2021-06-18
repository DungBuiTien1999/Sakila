const db = require('../utilis/db');

module.exports = {
    deleteByIdCat: async id_cat => await db('film_category').where('category_id', id_cat).del(),
}