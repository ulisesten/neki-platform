var jwt = require('jsonwebtoken');

function createJWT(data){
    return jwt.sign({ data: data }, 'secret', { expiresIn: 60 * 60 });
}

module.exports = {
    createJWT
}