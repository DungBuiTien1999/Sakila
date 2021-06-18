const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const list = await categoryModel.all();
    return res.json(list);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id || 0;
    const cat = await categoryModel.getById(id);
    if(cat === null) {
        return res.status(204).end();
    }
    return res.json(cat);
})

const schema = require('../schemas/category.json');

router.post('/', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const cat = req.body;
    const ret = await categoryModel.add(cat);
    cat.category_id = ret[0];
    return res.json(cat);
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id || 0;
    const cat = req.body;
    const ret = await categoryModel.updateById(cat, id);
    if(ret) {
        return res.json(ret);
    }
    return res.status(400).end();
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id || 0;
    if(id === 0) {
        return res.status(404).end();
    }
    const ret = await categoryModel.deleteById(id);
    if(ret === 0) {
        return res.status(400).end();
    }
    return res.json(ret);
})

module.exports = router;