var query = require('../database/queries'),
    jwt = require('./json-tokens'),
    nanoid = require('nanoid');

var clients = {};

function websockets(io){
    /*io.on('connection', socket => {
        console.log('io',socket.request.connection)
        console.log('+++++++++ connected ++++++++');
        socket.on('pub', function(pub) {
            var newPub = {
                time: new Date(),
                content: pub.content,
                user: pub.user
            }
            console.log(newPub);
        });
    });*/

    ws = io;

    ws.on('connection', socket => {
      //console.log('ws',socket)

      console.log('*********** connected **********')
      socket.send('server data')

      var authorized;
      var allow = false;

      socket.on('message', function incoming(data) {

          data = JSON.parse(data)
          //console.log(data.method);

          /**Authentication*/
          if(data.tipo === 'auth'){
            authorized = jwt.decode(data.token);

            if(authorized){

              allow = true;
              clients[authorized.id] = socket;
              
              /** Here go friends and pubs */
              query.getFriendsId(authorized.id, doc => {
                
                doc.push(authorized.id);
                query.matchingPubs(doc, res => {

                  var o = { "tipo": 'pubList', "list": res };
                  socket.send(JSON.stringify(o));

                })
                
              })
              
              
            } else {

              socket.close();
              console.log('La conexión fue cerrada')

            }
          }

          /**Si está autorizado */
          if(allow === true){
            console.log('auth',authorized);

            if(data.tipo === 'pub'){
              console.log('Nueva publicación')

              var toSave = {
                id: nanoid(),
                userid: data.userid,
                usuario: authorized.usuario,
                content: data.content,
                tiempo: data.tiempo
              }
              

              query.savePub(toSave, (res) => {
                  if(res) {
                    console.log('La publicación se guardó correctamente:', res);
                  } else {
                    console.log('Error al guardar publicación');
                  }
              })
            }

          } else {
            socket.close();
            console.log('La conexión fue cerrada')
          }

      });
    })

    ws.on('closed',() => {
      console.log('socket cerrado');
    })

  }

  module.exports = websockets;
