var fs = require('fs')

/**load html views */
function loadView(path,res,csrf){
    fs.readFile(path, function(err, data){
        if(!err){
           res.writeHead(200,{'content-type': 'text/html; charset=utf-8'})
           res.write(data)
           res.write('<input id="ctkn" type="hidden" value=' + csrf + ' />')
        } else {
            res.writeHead(404)
        }
        res.end()
    })
}

/**load static files */
function loadStatic(path, res){
    
}

module.exports = {
    loadView
}