var jwt = require('../utils/json-tokens'),
    csrf = require('../utils/csrf-tokens'),
    query = require('../database/queries');

var cookie = require('cookie');

var body = '';

function registrationApi(req, res){
    var regToken = jwt.createJWT(body);
    var mycookie = cookie.serialize('token', String(regToken), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    req.on('data', data => { body += data; });

    req.on('end', () => {

        body = JSON.parse(body);
        query.checkUser(body.correo, function(data){

            if( csrf.verify(req.csrf.secret, body.csrf) && data === null ){
                
                console.log('csrf passed');
                res.writeHead(200, { 'Set-Cookie': mycookie,'Content-Type': 'application/json; charset=utf-8' });
                res.write(JSON.stringify({ nombre: 'nombre: dev', token: regToken}));

            } else {

                console.log('csrf NOT passed');
                res.writeHead(404);

            }
            res.end();

        });

    });

    return mycookie;
}

function loginApi(){

}

module.exports = {
    registrationApi
}