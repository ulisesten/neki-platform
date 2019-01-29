///import { util } from "./loadFiles";
var util = require('./loadFiles'),
    jwt = require('./json-tokens'),
    cookie = require('cookie');


function home(req, res, csrfToken){
    var parsedCookie = cookie.parse(req.headers.cookie);

    var decodedToken = jwt.decode(parsedCookie.token)
    console.log('decodedToken',decodedToken)

    if(decodedToken){
        util.loadView('./views/index.html', res, csrfToken)
    } else {
        res.writeHead(302, {
            'Location': '/iniciar'
            //add other headers here...
          });
        res.end();
    }
}

module.exports = {
    home
}