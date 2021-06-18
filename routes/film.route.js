const filmModel = require('../models/film.model');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const list = await filmModel.all();
    res.json(list);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id || 0;
    const film = await filmModel.getFilmById(id);
    if(film === null){
        return res.status(204).end();
    }
    return res.json(film);
})

const schema = require('../schemas/film.json');

router.post('/',require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const film = req.body;
    const ids = await filmModel.add(film);
    film.film_id = ids[0];
    res.status(201).json(film);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id || 0;
    console.log(id);
    if(id === 0){
        return res.status(204).end();
    }
    const ret = await filmModel.deleted(id);
    res.status(200).json(ret);
})

router.patch('/:id', async (req, res) => {
    const filmNew = req.body;
    const id = req.params.id;
    const ret = await filmModel.update(id, filmNew);
    if(ret){
        res.status(200).json(ret);
    }
    res.status(400).end();
})

module.exports = router;