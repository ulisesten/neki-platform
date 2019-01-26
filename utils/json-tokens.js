var jwt = require('jsonwebtoken');

var secret = 'secret';

function createJWT(body){
    var data = {
        'nombre': body.nombre,
        'correo': body.correo,
        'contrasena': body.contrasena,
    }
    return jwt.sign(data,secret, { expiresIn: 60*60*24*7});
}

function decode(token){
   console.log('dec token',token)
   var decoded = jwt.verify(token,secret);
   return decoded;
}

module.exports = {
    createJWT,
    decode
}