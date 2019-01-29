var jwt = require('../utils/json-tokens'),
    csrf = require('../utils/csrf-tokens'),
    query = require('../database/queries'),
    nanoid = require('nanoid'),
    cookie = require('cookie'),
    bcrypt = require('bcryptjs');

var body = '';

/**Handle the registration request */
function registrationApi(req, res){
    req.on('data', data => { body += data; });

    req.on('end', () => {

        body = JSON.parse(body);

        //Check if user is in data base already
        query.checkUser(body.correo, function(data){

            //Verify the csrf token and expect to receive null as result from database
            if( csrf.verify(req.csrf.secret, body.csrf) && data === null ){

                //salt to encrypt passwords
                bcrypt.genSalt(10, function(err, salt) {

                    if(!err){
    
                        //encrypt passwords
                        bcrypt.hash(body.contrasena, salt, function(err, hash){
    
                            if(!err){
                             
                                //data to create json web token
                                var dataToSave = {
                                    'id': nanoid(),
                                    'correo': body.correo,
                                    'usuario': body.nombre,
                                    'clave': hash,
                                    'imagen': '',
                                    'tipo': 0,
                                    'ip': [req.connection.remoteAddress],
                                    'contrib': body.contrib,
                                    'tiempo': new Date()
                                }

                                query.saveUser(dataToSave, (doc) => {
                                    if(doc !== null){
                                        //Token to store in the cookie
                                        var regToken = jwt.createJWT(doc);

                                        var mycookie = genCookie(regToken);


                                        //setting the response
                                        console.log('csrf passed');
                                        res.writeHead(200, { 'Set-Cookie': mycookie,'Content-Type': 'application/json; charset=utf-8' });
                                        res.write(JSON.stringify({ nombre: doc.usuario}));
                                        res.end();
                                    }
                                })
                            
                            }
    
                        })
    
                    } else { console.log('error at bcrypt.genSalt'); }
    
                });

            } else {

                console.log('csrf NOT passed');
                res.writeHead(404, { 'Set-Cookie': clearCookie(),'Content-Type': 'application/json; charset=utf-8' });
                res.end();

            }

        });

    });
}


/**Handle the login request */
function loginApi(req, res){
    req.on('data', data => { body += data; });

    req.on('end', () => {

        body = JSON.parse(body);

        query.checkUser(body.correo, function(doc){

            var loginToken = jwt.createJWT(doc);
            var mycookie = genCookie(loginToken);

            if( csrf.verify(req.csrf.secret, body.csrf) ){

                console.log('login csrf passed');
                console.log('login',body.correo, doc.correo)
                if(body.correo === doc.correo){

                    bcrypt.compare(body.contrasena, doc.clave, (err, auth) => {

                        if( auth === true ){
                            res.writeHead(200, { 'Set-Cookie': mycookie,'Content-Type': 'application/json; charset=utf-8' });
                            res.write(JSON.stringify({ nombre: doc.nombre}));
                        } else {
                            console.log('Problemas con las credenciales')
                            res.writeHead(401, { 'Set-Cookie': clearCookie(),'Content-Type': 'application/json; charset=utf-8' });

                        }

                        res.end();

                    })

                } else {
                    console.log('login csrf NOT passed');
                    res.writeHead(401, { 'Set-Cookie': clearCookie(),'Content-Type': 'application/json; charset=utf-8' });

                    res.end();
                }

            } else {
                console.log('login csrf NOT passed');
                res.writeHead(401, { 'Set-Cookie': clearCookie(),'Content-Type': 'application/json; charset=utf-8' });
                res.end();

            }

        });

    });
}

function genCookie(toCookie){
    return cookie.serialize('token', String(toCookie), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
    })
}

function clearCookie(){
    return cookie.serialize('token', String(''), {
        httpOnly: true,
        expires: new Date(1), // 1 week
        path: '/'
    })
}

module.exports = {
    registrationApi,
    loginApi
}