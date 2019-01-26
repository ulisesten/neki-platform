///import { util } from "./loadFiles";
var util = require('./loadFiles'),
    jwt = require('./json-tokens'),
    cookie = require('cookie');


function home(req, res, token, incomingCookie){
    var cookieParsed = cookie.parse(req.headers.cookie);

    var decoded = jwt.decode(cookieParsed.token);
    
    if(decoded !== null){
        console.log('decoded', decoded)
        util.loadView('./views/index.html', res, token, cookieParsed)
    } else {
        console.log('wrong cookie')
    }

}

module.exports = {
    home
}