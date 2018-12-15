
/**ulisesten at 13/12/18 */
var fs = require('fs'),
    util = require('./utils/loadFiles'),
    csrf = require('./utils/csrf-tokens');


/**@global */
var vGlobal = {}

var PUBLIC = './public'

/**Main Function */
function app(req,res){

    req.csrf = vGlobal;

    /**Requests */
    if(req.method === 'GET'){
        
        /**GET requests */
        if(req.url === '/'){
            vGlobal = csrf.newToken()
            util.loadView('./views/index.html', res, vGlobal.token)
        } 
        
        else
          if(req.url === '/stylesheets/index.css'){
            util.loadStatic(PUBLIC+'/stylesheets/index.css', res, req.headers['accept-encoding'])
          }
          
        else
          if(req.url === '/scripts/home.js'){
            util.loadStatic(PUBLIC+'/scripts/home.js', res, req.headers['accept-encoding'])
          }
          
        else
          if(req.url === '/scripts/socket.io.js'){
            util.loadStatic(PUBLIC+'/scripts/socket.io.js', res, req.headers['accept-encoding'])
          }
        
        else /**HTML Registrar */
          if(req.url === '/registrar'){
            vGlobal = csrf.newToken()
            util.loadView('./views/registrar.html', res, vGlobal.token)
          }
          
        else
          if(req.url === '/stylesheets/access.css'){
            util.loadStatic(PUBLIC+'/stylesheets/access.css', res, req.headers['accept-encoding'])
          }
          
        else
          if(req.url === '/scripts/registrar.js'){
            util.loadStatic(PUBLIC+'/scripts/registrar.js', res, req.headers['accept-encoding'])
          }
          
        else {
            res.writeHead(404)
            res.end();
        }

    } else {
        res.writeHead(404)
        res.end();
    }
}

module.exports = app;