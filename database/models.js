var mongoose = require('mongoose');
var db = require('./connect');


var Schema = mongoose.Schema;

var Count = mongoose
                .model('counts', new Schema({
                        ip: String,
                        date: String
                    }, { collection: 'counts' }));

var User = mongoose
                .model('users',new Schema({
                    id: String,
                    correo: String,
                    usuario: String,
                    clave: String,
                    imagen: String,
                    role: Number,
                    ip: Array,
                    contrib: Boolean,
                    tiempo: String
                },{collection: 'usuarios'}))

var Pub = mongoose
                .model('pubs',new Schema({
                    id: String,
                    usuario: String,
                    content: String,
                    tiempo: String,
                    mg: Number,
                    nmg: Number,
                    coments: Number
                },{collection: 'publicaciones'}))

module.exports = {
    Count,
    User,
    Pub
}
