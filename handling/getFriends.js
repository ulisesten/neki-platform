/** ulisesten **/
const url = require('url'),
      cookie = require('cookie'),
      jwt = require('../utils/json-tokens'),
      csrf = require('../utils/csrf-tokens'),
      query = require('../database/queries');

function getFriends(req, res){
    
    var body = '';

    req.on('data', data => {
        /**Storing the body data */
        body += data;
    });

    req.on('end',() => {
        body = JSON.parse(body);
        console.log('getFriends function',body);

        console.log('body',body)
        var parsedCookie = cookie.parse(String(req.headers.cookie));
        var decodedToken = jwt.decode(parsedCookie.token)

        if(!csrf.verify(body.csrf)){
            console.log('login csrf not passed at getPubs');
            return;
        }

        console.log('csrf passed getFriends');

        if(decodedToken) {
            console.log('decodedToken getFriends',body)
            query.getFriends(body.id, data => {
                console.log('Friends:',data);
    
                res.writeHead(200);
                res.write(JSON.stringify(data));
                res.end();
            })
        }
    })
    
}

module.exports = getFriends;