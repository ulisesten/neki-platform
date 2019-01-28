/**ulisesten */

var send_btn = getEl('send');

send_btn.addEventListener('click',() => {
    var mCorreo = getEl('correo').value,
        mClave = getEl('clave').value,
        mCtkn = getEl('ctkn').value;

    if(mCorreo !== "" && mClave !== ""){ 
        register(mCorreo, mClave, mCtkn);
    }
    else { notif('La información no es correcta'); }

    return false;
})

/****************************/


function register(correo, pass, csrf){

    let h = new Headers();
        h.append('credentials','include')

    let req = new Request('/api/iniciar', {
        method: 'POST',
        headers: h,
        body: JSON.stringify({
            correo: correo,
            contrasena: pass,
            csrf: csrf })
    })

    fetch(req)
        .then(res => {
            if(res.ok === false){
                return;
            }
            return res.json();
        })
        .then(res => {
            console.log(res);
            window.location.href = '/';
        });
}

function getEl(id){
    return document.getElementById(id);
}

function notif(text){
    console.log(text);
}