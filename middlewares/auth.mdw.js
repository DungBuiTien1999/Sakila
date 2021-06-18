const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

module.exports = function (req, res, next) {
    const accesssToken = req.headers['x-access-token'];
    if(accesssToken) {
        try{
            const decode = jwt.verify(accesssToken, config.secret_key);
            req.accesssTokenPayload = decode;
            next();
        }catch(err) {
            console.log(err);
            return res.status(401).json({
                message: 'Invalid accessToken'
            })
        }
    }else {
        return res.status(400).json({
            message: 'AccessToken was not found!'
        })
    }
}