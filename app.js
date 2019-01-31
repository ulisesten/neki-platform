
/**ulisesten at 13/Dec/18 */
var fs = require('fs'),
    util = require('./utils/loadFiles'),
    access = require('./utils/accessControl'),
    csrf = require('./utils/csrf-tokens'),
    api = require('./api/api'),
    url = require('url');

/**@param global */
var vGlobal = {}
var PUBLIC = './public'

/**Main Function */
function app(req,res){
    /**Establishing csrf token for all routes */
    req.csrf = vGlobal;

    /**Requests */
    if(req.method === 'GET'){
        
        /********* GET METHOD **********/
        if(req.url === '/'){
            vGlobal = csrf.newToken()
            access.home(req, res, vGlobal.token);
        } 
        
        else
          if(req.url === '/stylesheets/index.css'){
            /**CSS */
            util.loadStatic(PUBLIC+'/stylesheets/index.css', res, req.headers['accept-encoding'])
          }
          
        else
          if(req.url === '/scripts/home.js'){
            /**SCRIPT */
            util.loadStatic(PUBLIC+'/scripts/home.js', res, req.headers['accept-encoding'])
          }
          
        else
          if(req.url === '/scripts/socket.io.js'){
            /**SCRIPT */
            util.loadStatic(PUBLIC+'/scripts/socket.io.js', res, req.headers['accept-encoding'])
          }
        
        else
          if(url.parse(req.url,true).pathname === '/registrar'){
            vGlobal = csrf.newToken()
            /**Storing referrer id: ref in vGlobal.ref */
            vGlobal.ref = url.parse(req.url,true).query.ref || 'noref';
            /**HTML Registrar */
            util.loadView('./views/registrar.html', res, vGlobal.token)
          }

        else /**HTML Login */
          if(req.url === '/iniciar'){
            vGlobal = csrf.newToken()
            util.loadView('./views/iniciar.html', res, vGlobal.token)
          }

        else
          if(req.url === '/scripts/iniciar.js'){
            util.loadStatic(PUBLIC+'/scripts/iniciar.js', res, req.headers['accept-encoding'])
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

    } else
      if(req.method === 'POST'){
          /******** POST METHOD *********/
          if(req.url === '/api/iniciar'){
              /**LOGIN */
              api.loginApi(req, res)
          }
            
          else
            if(req.url === '/api/registrar'){
              /**REGISTRO */
              api.registrationApi(req, res)
            }

    } else {
        res.writeHead(404)
        res.end();
    }

}

module.exports = app;