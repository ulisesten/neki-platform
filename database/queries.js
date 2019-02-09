/**Ulisesten at viernes septiembre 28, 2018
 *Consultas a la base de datos*/
var db = require('./connect'),
    model= require('./models');

/***/
var user = db.collection('usuarios');

function setCount(ip, date){
    var count = new model.Count({
        ip: ip,
        date: date
    });

    count.save(function(err,data){
        if(err) console.error('Error at count.save: ', err);
    });
}

function getCount(cb){
    var count = db.collection('counts');

    model.Count.find({},function (err, res) {
        if (err) console.error('getCount: ', err)
        cb(res)
    });
}


function checkUser(correo, callback){
    function checking(){
        return new Promise(function (done) {
            user.findOne({ 'correo': correo}, function(err, res){

                if(!res){
                    console.log('usuario no existe',err)
                    done(null);
                } else {
                    console.log('usuario existe')

                    if(!res.ref){
                        res.ref='platform'
                    }

                    done({
                        id: res.id,
                        nombre: res.usuario,
                        correo: res.correo,
                        clave: res.clave,
                        ref: res.ref,
                        _id: res._id});
                }
            })
        })
    }

    checking().then(function(res){
        callback(res);
    })
}

function saveUser(data, cb){
    var info = new model.User(data);

    info.save((err, res) => {
            if (err) {
                console.log('saveUser: Error al intentar guardar',error);
                cb(null);
            } else {
                console.log('saveUser: El siguiente usuario se guard_o correctamente', res.usuario);
                cb({
                    id: res.id,
                    nombre: res.usuario,
                    _id: res._id});
            }
        });
}


function matchingUsers(nombre, callback){
    function checking(){
        return new Promise(function (done) {

            var regex = new RegExp(nombre,'gi')
            model.User.find({ 'usuario': regex},'id usuario -_id', function(err, res){

                if(!res){
                    console.log('no hay coincidencias',err)
                    done(null);
                } else {
                    console.log('Se encontraron coincidencias')

                    done(res);
                }
            })
        })
    }

    checking().then(function(res){
        callback(res);
    })
}

function dropDb(){
  db.dropDatabase();
  console.log('borrando base de datos')
}

module.exports = {
    setCount,
    getCount,
    checkUser,
    saveUser,
    matchingUsers,
    dropDb
}
