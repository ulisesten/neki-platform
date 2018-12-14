function websockets(io){
    io.on('connection', socket => {
        console.log('+++++++++ connected ++++++++');
        socket.on('message', function(message) {
            console.log(message);
        });
    });
  }
  
  module.exports = websockets;