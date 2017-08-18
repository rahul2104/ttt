var express = require('express');
var app = require('express')();
var path = require('path');
var bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/ttt');
//console.log(mongoose.connection.readyState);
var Friend = require('./models/friend');
var User = require('./models/user');
var Game = require('./models/game');

var engine = require('ejs-locals');
app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


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
    var game=new Game({
        insert_date:new Date(),
        x_score:0,
        o_score:0,
        draw:0,
    });
    game.save(function (err) {
        if (err)
            return handleError(err);
        //console.log(game);
        res.redirect('/ttt/'+game._id);
    });
    res.sendFile(__dirname + '/ttt.html');
});

app.get('/ttt/:id', function (req, res) {
    //console.log(req.params.id);
    //res.sendFile(__dirname + '/ttt');
    res.render('ttt', {page_id: req.params.id});
});

socket.on('connection', function (socket) {
    console.log('*** connection ***');
    //socket.broadcast.to(socket.id).emit('connectServer',{ msg:'success'});
    handleClientDisconnections(socket);
    addUser(socket);
    scoreUpdate(socket);
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
function scoreUpdate(socket){
    socket.on('score', function (score) {
        if(score){
        Game.findOne({socket_id: socket.id}, function (err, user) {
            if (err)
                return console.error(err);
            if (user) {
                Game.update({socket_id: socket.id}, {$inc: {score: 1}}, {new : true}, function (err, tank) {
                    if (err)
                        return console.error(err);
                    console.log(score);
                });
            }
        });
       }
    });
}
function addUser(socket) {
    socket.on('storeClientInfo', function (customId) {
        if (customId) {
            Game.findOne({_id: customId}, function (err, user) {
            if (err)
                return console.error(err);
            //console.log(user.socket_id.length);
            if(user.socket_id.length<=2){
            Game.update({_id: customId}, {$push: {socket_id: socket.id}}, {new : true}, function (err, tank) {
                if (err)
                    return console.error(err);

                console.log("socket Id add");
                //socket.broadcast.emit('online', {id: customId});
            });
            }else{
                socket.emit('redirect', '/ttt');
            }
        });
        } else {
            console.log("give user id");
            console.log(customId);
        }
    });
}
function handleClientDisconnections(socket) {
    socket.on('disconnect', function () {
        Game.findOne({socket_id: socket.id}, function (err, user) {
            if (err)
                return console.error(err);
            if (user) {
                Game.update({socket_id: socket.id}, {$pull: {socket_id: socket.id}}, {new : true}, function (err, tank) {
                    if (err)
                        return console.error(err);
                    console.log('user disconnected');
                    socket.broadcast.emit('offline', {id: user._id});
                });
            }
        });
    });
}



