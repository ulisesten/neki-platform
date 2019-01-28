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

function setUser(){
    var usuario = new model.User({
        //Info del usuario
    });
}

function checkUser(correo, callback){
    function checking(){
        return new Promise(function (done) {
            user.findOne({ 'correo': correo}, function(err, res){

                if(err){
                    res = null;
                }

                done(res);
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
                console.log('saveUser: El siguiente usuario se guard_o correctamente', nombre);
                cb({
                    id: res.id,
                    nombre: res.usuario,
                    _id: res._id});
            }
        });
}

module.exports = {
    setCount,
    getCount,
    checkUser
}