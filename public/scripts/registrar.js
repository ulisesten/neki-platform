/**ulisesten */

var sig1_btn = getEl('sig1'),
    sig2_btn = getEl('sig2'),
    send_btn = getEl('enviar');

var part1 = document.querySelector('.part1'),
    part2 = document.querySelector('.part2'),
    part3 = document.querySelector('.part3');

sig1_btn.addEventListener('click',() => {
    if (getEl('correo').value !== ""
    && getEl('clave').value !== "") {
        part1.classList.add('inactive');
        part1.classList.add('quit');
        part2.classList.remove('hidden');
    } else {
        notif('Ingresa tus datos');
    }
})

sig2_btn.addEventListener('click',() => {
    var cClave = getEl('confClave').value,
        clave = getEl('clave').value,
        cCorreo = getEl('confCorreo').value,
        correo = getEl('correo').value;

    if ( cClave === clave
    && cCorreo === correo ) {

        part2.classList.add('inactive');
        part2.classList.add('quit');
        part3.classList.remove('hidden');

    } else {
        notif('Los datos no coinciden');
    }
})

send_btn.addEventListener('click',() => {
    var mNombre = getEl('nombre').value,
        mCorreo = getEl('correo').value,
        mClave = getEl('clave').value,
        mCtkn = getEl('ctkn').value,
        mContrib = false;

    if(getEl('contrib').checked){ mContrib = true; }

    if(mNombre !== ""){ register(mNombre, mCorreo, mClave, mCtkn, mContrib); }
    else { notif('La información no es correcta'); }
    //cargar.style.display = 'block';
    return false;
})

/****************************/

function register(nombre, correo, pass, csrf, contrib){
    fetch('/api/registrar', {
        credentials: 'include',
        method: 'POST', // or 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer '+'ughgkjhcr868hd7bvt6'
            //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: JSON.stringify({
            nombre: nombre,
            correo: correo,
            contrasena: pass,
            csrf: csrf,
            contrib: contrib
        })
    }).then(res => {
            if(res.ok == false){
                //cargar.style.display = 'none';
                console.log('err');
                return;
            }
            return res.json();
        }).then(res => {
        console.log(res);
        //cargar.style.display = 'none';
        window.location.href = '/';
        });
}

function getEl(id){
    return document.getElementById(id);
}

function notif(text){
    console.log(text);
}

