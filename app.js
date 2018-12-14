
/**ulisesten at 13/12/18 */
var fs = require('fs'),
    util = require('./utils/loadFiles'),
    csrf = require('./utils/csrf-tokens');


/**@global */
var vGlobal = {}


/**Main Function */
function app(req,res){

    req.csrf = vGlobal;

    /**Requests */
    if(req.method === 'GET'){
        if(req.url === '/'){
            vGlobal = csrf.newToken()
            util.loadView('./views/index.html', res, vGlobal.token)
        }



    } else {
        res.writeHead(404)
        res.end();
    }
}

module.exports = app;