var csrf = require('../utils/csrf-tokens')//,
//query = require('../database/queries');

var body = '';
    req.on('data', data => { body += data; });

    req.on('end', () => {

        body = JSON.parse(body);
        query.checkUser(body.correo, function(data){

            if( csrf.verify(req.csrf.secret, body.csrf) && data === null ){

                console.log('csrf passed');
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.write(JSON.stringify({ nombre: 'nombre: dev', token: 'sd87sdfus98d79s8d9syfs'}));

            } else {

                console.log('csrf NOT passed');
                res.writeHead(404);

            }
            res.end();

        });

    });