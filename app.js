
/**ulisesten at 13/Dec/18 */

var url = require('url'),
    util = require('./utils/loadFiles'),
    _cookies = require('./services/cookies'),
    csrf = require('./utils/csrf-tokens'),
    api = require('./api/loginAndSignUp'),
    getPubs = require('./handling/getPubs'),
    matchingUsers = require('./services/matchingUsers');

/**Pages load */
var homePage = require('./handling/getHome'),
    publicPage = require('./handling/getPublicPage');

    const { SECRET } = require('./config');

/**@param global */
var vGlobal = {}
var PUBLIC = './public'
var parsedUrl;

/**Main Function */
function app(req,res){
    /**Establishing csrf token for all routes */
    req.csrf = vGlobal.token;

    /**Requests */
    if(req.method === 'GET'){

        /********* GET METHOD **********/
        if(req.url === '/'){
            vGlobal.token = csrf.newToken()
            homePage(req, res, vGlobal.token);
            //publicPage(req, res, vGlobal.token);
        }

        else if(req.url === '/stylesheets/index.css'){
            /**CSS */
            util.loadStatic(PUBLIC+'/stylesheets/index.css', res, req.headers['accept-encoding'])
        }

        else if(req.url === '/scripts/home.js'){
            /**SCRIPT */
            util.loadStatic(PUBLIC+'/scripts/home.js', res, req.headers['accept-encoding'])
        }

        else if(req.url === '/registrar'){
            vGlobal.token = csrf.newToken();

            /**HTML Registrar */
            util.loadView('./views/registrar.html', res, vGlobal.token)
        }

        else if(req.url === '/iniciar'){
            vGlobal.token = csrf.newToken()
            util.loadView('./views/iniciar.html', res, vGlobal.token)
        }

        else if(req.url === '/scripts/iniciar.js'){
            util.loadStatic(PUBLIC+'/scripts/iniciar.js', res, req.headers['accept-encoding'])
        }

        else if(req.url === '/stylesheets/access.css'){
            util.loadStatic(PUBLIC+'/stylesheets/access.css', res, req.headers['accept-encoding'])
        }

        else if(req.url === '/scripts/registrar.js'){
            util.loadStatic(PUBLIC+'/scripts/registrar.js', res, req.headers['accept-encoding'])
        }

        else if(url.parse(req.url,true).pathname === '/api/getPublications'){
            getPubs(req,res);
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

          else
            if(req.url == '/api/users'){
              matchingUsers(req, res);
            }

          else
            if(req.url == '/api/wsAuth'){
              api.wsAuth(req,res);
            }

          else
            if(req.url == '/api/salir'){
              res.writeHeader(200,_cookies.redirect())
              res.end();
            }

    } else {
        res.writeHead(404)
        res.end();
    }

}

module.exports = app;
