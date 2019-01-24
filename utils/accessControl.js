///import { util } from "./loadFiles";
var util = require('./loadFiles');


function home(req, res, token, cookie){
    util.loadView('./views/index.html', res, token, cookie)
}

module.exports = {
    home
}