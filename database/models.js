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
                    tipo: Number,
                    ref: String,
                    ip: Array,
                    contrib: Boolean,
                    tiempo: String
                },{collection: 'usuarios'}))

module.exports = {
    Count,
    User
}
