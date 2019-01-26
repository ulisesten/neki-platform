
/**ulisesten at 13/12/18 */
var fs = require('fs'),
    util = require('./utils/loadFiles'),
    access = require('./utils/accessControl'),
    csrf = require('./utils/csrf-tokens'),
    api = require('./api/api');

var cookie = require('cookie')
var cookiePropagator = require('./utils/populate')
var propagator = new cookiePropagator()

/**@global */
var vGlobal = {}
var cGlobal = {cookies: ''}

var PUBLIC = './public'

/**Main Function */
function app(req,res){
    req.csrf = vGlobal;
    //req.cookies = res.cookies = cGlobal.cookies;

    /**Requests */
    if(req.method === 'GET'){
        
        /********* GET METHOD **********/
        if(req.url === '/'){
            vGlobal = csrf.newToken()
            access.home(req, res, vGlobal.token, propagator.getCookie());
            
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

    } else
        if(req.method === 'POST'){
            /******** POST METHOD *********/
            if(req.url === '/api/registrar'){
               var res = api.registrationApi(req, res)
               propagator.setCookie(res)
               cGlobal.cookies = res;
            }

    } else {
        res.writeHead(404)
        res.end();
    }

}

module.exports = app;