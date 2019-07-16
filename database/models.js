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
                    user_id: String,
                    email: String,
                    username: String,
                    password: String,
                    image: String,
                    role: Number,
                    user_ip: Array,
                    contrib: Boolean,
                    timestamp: String
                },{collection: 'usuarios'}))

var Pub = mongoose
                .model('pubs',new Schema({
                    id: String,
                    userid: String,
                    username: String,
                    content: String,
                    timestamp: String,
                    mg: Number,
                    nmg: Number,
                    coments: Number
                },{collection: 'publicaciones'}))

var Friend = mongoose
                .model('friends', new Schema({
                    userid: String,
                    user: String,
                    friendid: String,
                    friend: String
                },{collection: 'amigos'}))

module.exports = {
    Count,
    User,
    Pub,
    Friend
}
