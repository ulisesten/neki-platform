/**ulisesten */

var send_btn = getEl('send');

send_btn.addEventListener('click',() => {
    send_btn.disabled = true;
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
            if(res.status === 200){
                return res.json();
            } else {
                send_btn.disabled = false;
                console.log('error', res)
                return null;
            }
        })
        .then(res => {
            if(res !== null){
                localStorage.setItem("nombre", res.nombre);
                window.location.href = '/';
            } else 
                return;
        });
}

function getEl(id){
    return document.getElementById(id);
}

function notif(text){
    console.log(text);
}