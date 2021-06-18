const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const express = require('express');

const router = express.Router();

// router.get('/', async (req, res) => {
//     const list = await userModel.all();
//     res.json(list);
// })

// router.get('/:id', async (req, res) => {
//     const id = req.params.id || 0;
//     const user = await userModel.getuserById(id);
//     if(user === null){
//         return res.status(204).end();
//     }
//     return res.json(user);
// })

const schema = require('../schemas/user.json');

router.post('/',require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const user = req.body;
    //check username and password whether be empty
    if(user.password === "" || user.username === ""){
        return res.status(400).json({
            message: "username and password do not empty!"
        })
    }

    user.password = bcrypt.hashSync(user.password, 10);

    const ids = await userModel.add(user);

    user.user_id = ids[0];
    delete user.password;
    res.status(201).json(user);
})

// router.delete('/:id', async (req, res) => {
//     const id = req.params.id || 0;
//     console.log(id);
//     if(id === 0){
//         return res.status(204).end();
//     }
//     const ret = await userModel.deleted(id);
//     res.status(200).json(ret);
// })

// router.patch('/:id', async (req, res) => {
//     const userNew = req.body;
//     const id = req.params.id;
//     const ret = await userModel.update(id, userNew);
//     if(ret){
//         res.status(200).json(ret);
//     }
//     res.status(400).end();
// })

module.exports = router;