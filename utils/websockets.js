var query = require('../database/queries'),
    jwt = require('./json-tokens'),
    nanoid = require('nanoid');

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

          /**Authentication*/
          if(data.tipo === 'auth'){
            authorized = jwt.decode(data.token);
            if(authorized){
              allow = true;
              console.log('User allowed')
            } else {
              socket.close();
              console.log('La conexión fue cerrada')
            }
          }

          /**Si está autorizado */
          if(allow === true){

            if(data.tipo === 'pub'){
              console.log('Nueva publicación')

              var toSave = {
                id: nanoid(),
                usuario: authorized.nombre,
                content: data.content,
                tiempo: data.tiempo
              }

              query.savePub(toSave, (res) => {
                  if(res) {
                    console.log('La publicación se guardó correctamente:', res);
                  } else {
                    console.log('Error al guarar publicación');
                  }
              })
            }

          } else {
            socket.close();
            console.log('La conexión fue cerrada')
          }

      });
    })

  }

  module.exports = websockets;
