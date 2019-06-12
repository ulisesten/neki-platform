///import { util } from "./loadFiles";
var db = require('../database/queries'),
    csrf = require('../utils/csrf-tokens');


function addContact(req, res){ 
    var body = '';

    req.on('data', data => {
        /**Storing the body data */
        body += data;
    });

    req.on('end', () => {

        /**Parsing the body to make it readable */
        body = JSON.parse(body);
        if(csrf.verify(body.csrf)){

            res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'})

            if(body.userid !== body.friendid){

                db.setFriend(body, doc => {

                    if(doc === null)

                        res.write(JSON.stringify({ msg: 'Error al intentar añadir contacto'}));

                    else
                    
                        res.write(JSON.stringify({ msg: 'Contacto agregado'}));

                    res.end();

                });
                
            } else {
                res.write(JSON.stringify({ msg: 'No te puedes agregar a ti mismo'}));
                res.end();
            }
        } else {
            res.writeHead(403,{'Content-Type': 'application/json; charset=utf-8'})
            res.end();
        }
        
    });

}

module.exports = addContact;