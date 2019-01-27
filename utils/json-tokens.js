var jwt = require('jsonwebtoken');

var secret = 'secret';

function createJWT(data){
    return jwt.sign(data,secret, { expiresIn: 60*60*24*7});
}

function decode(token){
    try {
        return jwt.verify(token, secret);
    } catch(err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    createJWT,
    decode
}