const express = require('express');
const countryModel = require('../models/country.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const list = await countryModel.all();
    return res.json(list);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id || 0;
    const country = await countryModel.getById(id);
    if(country === null){
        return res.status(204).end();
    }
    return res.json(country);
})

const schema = require('../schemas/country.json');

router.post('/', require('../middlewares/validate.mdw')(schema) , async ( req, res) => {
    const newCountry = req.body;
    const ret = await countryModel.add(newCountry);
    newCountry.country_id = ret[0];
    return res.status(201).json(newCountry);
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id || 0;
    const country = req.body;
    if(id === 0) {
        return res.status(204).end();
    }
    const ret = await countryModel.updateById(country, id);
    if(ret){
        return res.json(ret);
    }
    return res.status(400).end();
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id || 0;
    if(id === 0) {
        return res.status(204).end();
    }
    const ret = await countryModel.deleteById(id);
    if(ret === 0) {
        return res.status(404).end();
    }
    return res.json(ret);
})

module.exports = router;