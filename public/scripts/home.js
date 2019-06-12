/**ulisesten at jan 2019 */

document.addEventListener('DOMContentLoaded', () => {

/**************** Utils ****************/

function getEl(id){
  return document.getElementById(id);
}

function newEl(el){
    return document.createElement(el);
}

/**Notificaciones */
function notif(text){
    var div = newEl('div');
    div.setAttribute('class','notif border');
    div.innerHTML = text;
    document.body.append(div);
    
    setTimeout(() => {
        div.remove();
    }, 8000 )
}


/**vars */
const usuario = localStorage.getItem('usuario');
const mId = localStorage.getItem('id');
console.log(usuario);
var m_socket;


/**Calls */
getFriends();


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
    //console.log('auth',auth.wsAuth);
    var ws = new WebSocket(url);
    var auth = {tipo: 'auth' , token: auth.wsAuth};

    m_socket = ws;

    ws.addEventListener('open', function() {
      console.log('ws connected');
      ws.send(JSON.stringify(auth));
    });

    ws.addEventListener('message', function (event) {
        res = JSON.parse(event.data);
        console.log('pubs',res.list)
        if(res !== null && res.tipo === 'pubList')
        res.list.forEach(el => {
            newPub(el);
        })
    });

    var pubSender = getEl('pubSender');
    pubSender.addEventListener('click',function(){
        let pubContent = getEl('pubContent');
        var pubData = {
          userid: mId,
          tipo: 'pub',
          content: pubContent.value,
          tiempo: new Date(),
          tkn: getEl('ctkn').value
        }

        pubContent.value = '';

        ws.send(JSON.stringify(pubData));
        pubData.usuario = usuario;
        console.log(usuario)
        newPub(pubData);
    });
})

/************* Board *****************/

/** Subiendo imágenes */
var img_loading = getEl('load_image');

img_loading.addEventListener('change', e => {
    var divOut = newEl('div');
        divOut.setAttribute('class','divOut');

    var div = newEl('div');
        div.setAttribute('class','image_target_container');

    var img_preview = newEl('img');
        img_preview.setAttribute('class','image_target');

    var file = e.target.files[0];

    if (!file.type.match('image.*')) return;

    var reader = new FileReader();
    reader.onload = (
        function() {
            return function(e) {
                img_preview.setAttribute('src',e.target.result);
                div.append(img_preview);
                divOut.append(div);
                document.body.append(divOut);
            }
    })(file)

    reader.readAsDataURL(file);

    divOut.addEventListener('click',() => {
        img_preview.remove();
        div.remove();
        divOut.remove();
    })
})

/** Image editing */



/************* Publications **************/
function newPub(res){
    res.nombre = res.usuario;

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
        hora.innerHTML = res.tiempo;

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

/** Get Friends **/
function getFriends(){
    console.log('getting friends')
    var queryHeaders = {
        'Content-Type': 'application/json; charset=utf-8'
    }

    var url = '/api/getFriends';

    fetch(url, {
        credentials: 'include',
        headers: queryHeaders,
        method: 'POST',
        body: JSON.stringify({
            csrf: getEl('ctkn').value,
            id: mId
        })
      })
        .then(res => {
          if(res.ok == false){
              console.log('Home->getFriends(): error');
              return;
          }
          return res.json();
      })
        .then(res => {
        console.log('Home->getFriends():',res);
        if(res !== null)
        res.forEach(el => {
            console.log(el);
            var div = newEl('div');
            div.setAttribute('id',el.friendid);
            div.setAttribute('class','friend');
            div.innerHTML = el.friend;
            getEl('friendzone').append(div);
        })
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

var queryHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': getEl('ctkn').value,
    'Tipo': 'query'
}

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
          console.log('Home->getSearches:',el);

          var span = newEl('div');
          span.setAttribute('id',el.id);
          span.setAttribute('class','searchText');
          span.textContent = el.usuario;
          searchResults.appendChild(span);
          span.addEventListener('click', () =>{
              createMenuBusquedaPerfil(getCoor(span),{'id': el.id, 'usuario': el.usuario});
          });
          

        })
    });
}


/******************** Salir *******************/
getEl('salir').addEventListener('click', function(){
    m_socket.close();
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

/*** Get Auth ***/
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


/************* Add friends *************/

function agregandoContacto(data){
    //id= data.target.id;
    console.log('agregandoContacto',data);
    data.csrf = getEl('ctkn').value;
    addContact(data);
}

/**************** Menu creations **************/

/**Obtiene las coordenadas de los elementos a los que se hace click */
function getCoor(el){
    var rect = el.getBoundingClientRect();
    var docEl = document.documentElement;

    var rectTop = rect.top + window.pageYOffset - docEl.clientTop + 10;
    var rectLeft = rect.right + window.pageXOffset - docEl.clientLeft;
    return { top: rectTop, left: rectLeft };
}

/** Crea menu el perfil donde se hace click */
function createMenuBusquedaPerfil(coor,data){
    var divOut = newEl('div');
    divOut.setAttribute('class','menuOut');
    divOut.addEventListener('click',function(){
        var el = document.getElementById('menuContextOptions');
        el.remove();
        this.remove();
    })

    var div = newEl('div');
    div.setAttribute('id','menuContextOptions');
    div.setAttribute('class','optionsMenu border');
    div.style.left = '30px';
    div.style.top = coor.top + 5 +'px';

    var span = newEl('span');
    span.setAttribute('class','optionsMenuEl enlace');
    span.innerHTML = 'Agregar a contactos';
    //span.setAttribute('id',data);
    span.addEventListener('click',() => {
        agregandoContacto(data);
    })

    var span1 = newEl('span');
    span1.setAttribute('class','optionsMenuEl enlace');
    span1.innerHTML = 'Enviar mensaje';

    div.append(span);
    div.append(span1);
    document.body.append(divOut);
    document.body.append(div);
}

function addContact(data){
    fetch('/api/addCnt', {
        credentials: 'include',
        headers: queryHeaders,
        method: 'POST',
        body: JSON.stringify({
            'userid': mId,
            'user': usuario,
            'friendid': data.id,
            'friend': data.usuario,
            'csrf': data.csrf
        })
    })
    .then(res => {
        if(res.ok == false){
            console.log('Home->addContact(): error');
            return;
        }
         return res.json();
    })
    .then(res => {
        console.log('Home->addContact():',res);
        notif(res.msg);
    });
}

})//DOCLoaded
