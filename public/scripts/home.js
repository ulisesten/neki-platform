/************** WebSockets **************/
var ws = new io();

ws.on('connect',function() {
  console.log('connected');
});

ws.on('disconnect', function(){});

var pubSender = getEl('pubSender');
pubSender.addEventListener('click',function(){
    var newPub = {
      time: '45:78:12',
      content: getEl('pubContent').value,
      tkn: getEl('ctkn').value
    }
    ws.emit('pub',newPub);
});

/************** Get Publications **************/
function pubs(){
    fetch('/api/traer-publicaciones', {
        credentials: 'include',
        method: 'GET', // or 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
        }
    }).then(res => {
          if(res.ok == false){
              //cargar.style.display = 'none';
              console.log('err');
              return;
          }
          return res.json();
      }).then(res => {
        console.log(res);
      });
}

function getEl(id){
  return document.getElementById(id);
}

function notif(text){
    console.log(text);
}