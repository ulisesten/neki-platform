/** ulisesten **/
const url = require('url'),
      cookie = require('cookie'),
      jwt = require('../utils/json-tokens'),
      csrf = require('../utils/csrf-tokens'),
      query = require('../database/queries');

function getPubs(req, res){
    var parsedUrl = url.parse(req.url,true);
    var parsedCookie = cookie.parse(String(req.headers.cookie));
    var decodedToken = jwt.decode(parsedCookie.token)

    //console.log('csrf',parsedUrl.query.csrf);
    
    if( !csrf.verify(parsedUrl.query.csrf) ){
        console.log('login csrf not passed at getPubs');
        return;
    }

    if(decodedToken) {
        query.matchingPubs(decodedToken.nombre, data => {
            console.log('pubs:',data);

            res.write(JSON.stringify(data));
            res.end();
        })
    }


    
}

module.exports = getPubs;