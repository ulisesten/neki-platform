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
    div.setAttribute('class','content pubs sombra');
    div.setAttribute('id',res.pubid);

    var publication = newEl('p');
        publication.setAttribute('class','marginClass');
        //publication = setFontSize(publication,res.content);
        //publication = linkify(publication,res.pub,no_previsualization);


    //var imgUrl = getImage(res.imagen);
    var uImg = newEl('img');
        uImg.setAttribute('class','uImg borde');
        //uImg.setAttribute('src',imgUrl);

    var a = newEl('a');
        a.setAttribute('class','enlace marginClass usuario');
        a.setAttribute('href','/pagina/'+res.nombre);
        a.innerHTML = res.nombre;

    var hora = newEl('span');
        hora.setAttribute('class','horaP');
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
    div.prepend(publication);
    div.prepend(hora);
    div.prepend(a);
    div.prepend(uImg);
    //div.addEventListener('click',getPublicationID);

    getEl('publications').prepend(div);
}

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