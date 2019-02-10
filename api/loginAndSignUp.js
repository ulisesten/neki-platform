/**Ulisesten at Jan 2019 */

var jwt = require('../utils/json-tokens'),
    csrf = require('../utils/csrf-tokens'),
    query = require('../database/queries'),
    _cookies = require('../services/cookies'),
    nanoid = require('nanoid'),
    bcrypt = require('bcryptjs');

/**Handle the registration request */
function registrationApi(req, res){
    var body = '';

    req.on('data', data => {
        body += data;
    });

    req.on('end', () => {

        body = JSON.parse(body);

        console.log('csrf',body.csrf)

        //query.dropDb();

        //Verify the csrf token and expect to receive null as result from database
        if( csrf.verify(body.csrf) ){

            //Check if user is in data base already
            query.checkUser(body.correo, function(data){

                if(!data){

                    //salt to encrypt passwords
                    bcrypt.genSalt(10, function(err, salt) {

                        if(!err){

                            //encrypt passwords with salt
                            bcrypt.hash(body.contrasena, salt, function(err, hash){

                                if(!err){

                                    //data to create json web token
                                    var dataToSave = {
                                        'id': nanoid(),
                                        'correo': body.correo,
                                        'usuario': body.nombre,
                                        'clave': hash,
                                        'imagen': '',
                                        'role': 0,
                                        'ip': [req.connection.remoteAddress],
                                        'contrib': body.contrib,
                                        'tiempo': new Date()
                                    }

                                    /**Saving user data */
                                    query.saveUser(dataToSave, (doc) => {
                                        if(doc !== null){
                                            //Token to store in the cookie
                                            var regToken = jwt.createJWT(doc);

                                            var mycookie = _cookies.genCookie(regToken);

                                            //setting the response
                                            console.log('csrf passed');
                                            res.writeHead(200, _cookies.header(mycookie));
                                            res.write(JSON.stringify({ nombre: doc.usuario, ref: doc.ref}));
                                            res.end();
                                        }
                                    })

                                }

                            })

                        } else {
                            console.log('error at bcrypt.genSalt');
                        }

                    });
                } else {
                    res.end()
                }

            });

        } else {
          console.log('csrf not passed')
        }

    });
}


/**Handle the login request */
function loginApi(req, res){
    /**var to store the request body*/
    var body = '';

    req.on('data', data => {
        /**Storing the body data */
        body += data;
    });

    req.on('end', () => {

        /**Parsing the body to make it readable */
        body = JSON.parse(body);

        query.dropDb();

        /**Checkin if the user exists */
        query.checkUser(body.correo, function(doc){

            if(doc){
                /**Creating a token with the user data */
                var loginToken = jwt.createJWT(doc);

                /**Storing the token in a cookie */
                var mycookie = _cookies.genCookie(loginToken);

                /**Checking the csrf protection */
                if( csrf.verify(body.csrf) ){

                    console.log('login csrf passed'); console.log('Trying to login',body.correo);

                    /**Checking the paasword matching */
                    bcrypt.compare(body.contrasena, doc.clave, (err, auth) => {

                        if( auth === true ){
                            res.writeHead(200, _cookies.header(mycookie));
                            res.write(JSON.stringify({ nombre: doc.nombre, ref: doc.ref }));
                        } else {
                            console.log('Problemas con las credenciales')
                            res.writeHead(401, _cookies.header(_cookies.clearCookie()));

                        }
                        res.end();

                    })

                } else {
                    console.log('login csrf NOT passed');
                    res.writeHead(401, _cookies.header(_cookies.clearCookie()));
                    res.end();

                }
            } else {
                res.writeHead(401, _cookies.header(_cookies.clearCookie()));
                res.end()
            }

        });
    });

}

module.exports = {
    registrationApi,
    loginApi
}
