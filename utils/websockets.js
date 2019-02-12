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
      console.log('ws',socket)

      console.log('*********** connected **********')
    })
  }

  module.exports = websockets;
