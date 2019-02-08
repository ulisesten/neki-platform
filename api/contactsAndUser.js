/**ulisesten at 31 jan 2019 */

var csrf = require('../utils/csrf-tokens'),
    query = require('../database/queries');

/**Handle the login request */
function searchUsers(req, res){
    /**var to store the request body*/
    var body = '';

    req.on('data', data => {
        /**Storing the body data */
        body += data;
    });

    req.on('end', () => {
        
        /**Parsing the body to make it readable */
        body = JSON.parse(body);

        res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'})
        res.write(JSON.stringify({ contacts: ['user1','user2']}));
        res.end();
            
    });

}