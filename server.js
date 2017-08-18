var express = require('express');
var app = require('express')();
var path = require('path');
var bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost/test');
//console.log(mongoose.connection.readyState);
var Friend = require('./models/friend');
var User = require('./models/user');

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000);
var socket = io.listen(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.get('/ttt', function (req, res) {
    res.sendFile(__dirname + '/ttt.html');
});

socket.on('connection', function (socket) {
    console.log('*** connection ***');
    //socket.broadcast.to(socket.id).emit('connectServer',{ msg:'success'});
    //handleClientDisconnections(socket);
    //addUser(socket);
    socket.on('drawing', function (data) {
        //console.log(data);
        socket.broadcast.emit('drawing', data);
    });
    socket.on('player', function (data) {
        //console.log(data);
        socket.broadcast.emit('player', data);
    });

    socket.on('restart', function (data) {
        //console.log(data);
        socket.broadcast.emit('restart', data);
    });
});

function addUser(socket) {
    socket.on('storeClientInfo', function (customId) {
        if (customId) {
            User.findByIdAndUpdate(customId, {$push: {socketId: socket.id}}, {new : true}, function (err, tank) {
                if (err)
                    return console.error(err);
                console.log(socket.id);
                console.log("socket Id add");
                console.log(customId);
                socket.broadcast.emit('online', {id: customId});
            });
        } else {
            console.log("give user id");
            console.log(customId);
        }
    });
}
function handleClientDisconnections(socket) {
    socket.on('disconnect', function () {
        User.findOne({socketId: socket.id}, function (err, user) {
            if (err)
                return console.error(err);
            //console.error('++++');
            //console.error(user);
            if (user) {
                User.update({socketId: socket.id}, {$pull: {socketId: socket.id}}, {new : true}, function (err, tank) {
                    if (err)
                        return console.error(err);
                    console.log('user disconnected');
                    socket.broadcast.emit('offline', {id: user._id});
                });
            }
        });
    });
}



