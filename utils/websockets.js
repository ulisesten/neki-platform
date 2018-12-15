function websockets(io){
    io.on('connection', socket => {
        console.log('+++++++++ connected ++++++++');
        socket.on('pub', function(pub) {
            var newPub = {
                time: new Date(),
                content: pub.content,
                user: pub.user
            }
            console.log(newPub);
        });
    });
  }
  
  module.exports = websockets;