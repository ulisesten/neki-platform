/**ulisesten */

var csrf = require('csrf-token');

function newToken(){
    var secret = 'uuno1234hgdygjhh';
    return { secret: secret, token: csrf.createSync(secret, 10) };
}

function verify(secret, token){
    return csrf.verifySync('uuno1234hgdygjhh',token);
}

module.exports = {
    newToken,
    verify
}