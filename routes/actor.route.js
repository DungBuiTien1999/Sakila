const express = require('express');
const actorModel = require('../models/actor.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const list = await actorModel.all();
    res.json(list);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id || 0;
    const actor = await actorModel.getActorById(id);
    if(actor === null){
        return res.status(204).end();
    }
    return res.json(actor);
})

const schema = require('../schemas/actor.json');

router.post('/', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const newActor = req.body;
    const ret = await actorModel.add(newActor);
    newActor.actor_id = ret[0];
    return res.status(201).json(newActor);
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const newActor = req.body;
    const ret = await actorModel.updateById(newActor, id);
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
    const ret = await actorModel.deleteById(id);
    if(ret === 0){
        return res.status(404).end();
    }
    return res.json(ret);
})

module.exports = router;