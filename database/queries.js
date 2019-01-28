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

function saveUser(data){
    var info = new model.User(data);

    info.save()
        .then(() => {
            console.log('New User Saved')
        });
}

module.exports = {
    setCount,
    getCount,
    checkUser
}