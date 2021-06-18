const express = require('express');
const cityModel = require('../models/city.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const list = await cityModel.all();
    return res.json(list);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id || 0;
    const city = await cityModel.getCityById(id);
    if(city === null){
        return res.status(204).end();
    }
    return res.json(city);
})

const schema = require('../schemas/city.json');

router.post('/', require('../middlewares/validate.mdw')(schema) , async (req, res) => {
    const newCity = req.body;
    const ret = await cityModel.add(newCity);
    newCity.city_id = ret[0];
    return res.status(201).json(newCity);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id || 0;
    if(id === 0){
        return res.status(204).end();
    }
    const ret = await cityModel.deleteById(id);
    if(ret === 0){
        return res.status(404).end();
    }
    return res.json(ret);
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const newCity = req.body;
    const ret = await cityModel.updateCityById(newCity, id);
    if(ret){
        return res.json(ret);
    }
    return res.status(400).end();
})

module.exports = router;