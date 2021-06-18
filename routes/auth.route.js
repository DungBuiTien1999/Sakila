const userModel = require('../models/user.model');
const randomstring = require('randomstring');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const router = express.Router();

const schema = require('../schemas/auth.json');

router.post('/',require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const user = await userModel.getUserByUsername(req.body.username);
    if(user === null) {
        return res.json({
            authenticated: false,
            message: "username don't exist"
        });
    }

    if(!bcrypt.compareSync(req.body.password, user.password)) {
        return res.json({
            authenticated: false,
            message: "password is wrong"
        });
    }

    const payload = {
        userId: user.id,
        name: user.name
    }

    const opts = {
        expiresIn: 10*60
    }

    const secretKey = config.secret_key;

    const accessToken = jwt.sign(payload, secretKey, opts);
    const refreshToken = randomstring.generate(80);
    await userModel.patchRFToken(user.id, refreshToken);

    return res.json({
        authenticated: true,
        accessToken,
        refreshToken
    })
})

router.post('/refresh', async (req, res) => {
    const {accessToken, refreshToken} = req.body;
    const secretKey = config.secret_key;
    const {userId, name} = jwt.verify(accessToken, secretKey, {
        ignoreExpiration: true
    });

    const ret = await userModel.isValidRFToken(userId, refreshToken);
    if(ret) {
        const newAccessToken = jwt.sign({userId, name}, secretKey, {
            expiresIn: 10*60
        });
        return res.json({
            accessToken: newAccessToken
        })
    }

    return res.status(400).json({
        message: 'refreshToken is revoked!'
    })
})

module.exports = router;