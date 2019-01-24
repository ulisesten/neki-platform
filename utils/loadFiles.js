var fs = require('fs'),
    zlib = require('zlib')

/**load html views */
function loadView(path,res,csrf, cookie){
    if (cookie === undefined){
        cookie = 'token=sdf89sdfs98ffs98'
    }

    var mystring = {'Set-Cookie': cookie
    ,'Content-Type': 'text/html; charset=utf-8'}

     
    fs.readFile(path, function(err, data){
        if(!err){
           res.writeHead(200, mystring)
           res.write(data)
           res.write('<input id="ctkn" type="hidden" value=' + csrf + ' />')
        } else {
            res.writeHead(404)
        }
        res.end()
    })
}

/**load static files */
function loadStatic(path, res, acceptEncoding){
    fs.readFile(path, function(err, data){
        if(!err){
            var raw = fs.createReadStream(path);

            if (acceptEncoding.match(/\bdeflate\b/)) {
                res.writeHead(200, { 'content-encoding': 'deflate' });
                raw.pipe(zlib.createDeflate()).pipe(res);
            } else if (acceptEncoding.match(/\bgzip\b/)) {
                res.writeHead(200, { 'content-encoding': 'gzip' });
                raw.pipe(zlib.createGzip()).pipe(res);
            } else {
                res.writeHead(200, {});
                raw.pipe(response);
            }
        } else {
            res.writeHead(404)
            res.end()
        }
        
    })
}

module.exports = {
    loadView,
    loadStatic
}