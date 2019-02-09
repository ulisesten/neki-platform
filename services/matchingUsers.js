/** ulisesten **/
const csrf = require('../utils/csrf-tokens'),
      query = require('../database/queries'),
      {SECRET} = require('../config');

function matchingUsers(req, res){
  /**var to store the request body*/
  var body = '';

  req.on('data', data => {
      /**Storing the body data */
      body += data;
  });

  req.on('end', () => {

      /**Parsing the body to make it readable */
      body = JSON.parse(body);

      /**Checking the csrf protection */
      if( !csrf.verify( SECRET , body.csrf) ){
          console.log('login csrf not passed');
          return;
      }

      /**Checkin if the user exists */
      query.matchingUsers(body.user, function(doc){

          if(doc){
            console.log('Se encontraron los siguentes usuarios:', doc);
            res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'})
            res.write(JSON.stringify(doc));

          } else {
            res.writeHead(404,{'Content-Type': 'application/json; charset=utf-8'});
          }

          res.end()

      });
  });
}

module.exports = matchingUsers;
