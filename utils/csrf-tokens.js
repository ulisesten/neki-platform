/**ulisesten */

var csrf = require('csrf-token');
const { SECRET } = require('../config');

function newToken(){
    return csrf.createSync(SECRET, 10);
}

function verify(token){
    return csrf.verifySync( SECRET , token );
}

module.exports = {
    newToken,
    verify
}
