var http = require('http');
var path = require('path');
var url = require('url');
var socketio = require('socket.io');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
var jsonfile = require('jsonfile');
var util = require('util');
var delayed = require("delayed");

var file0 = './sample.json', file1='./sampleFutur.json';

function present(array) {
    var present=[jsonfile.readFileSync(file0).tWell,
        jsonfile.readFileSync(file0).tHumi,
        jsonfile.readFileSync(file0).tVMC];
        
    if (array==null) {
        return present
    }
    else {
        return present[array]
    }
}

    io.sockets.on('connection', function (socket) {
        socket.emit('data',present());
        
    socket.on('input', function (input) {
        console.log("input : "+input);
        var inputF={tWell: input[0],tHumi: present(1), tVMC: input[1]};
        jsonfile.writeFile(file1,inputF, function (err) {
            console.error("Erreur de l'écriture de : "+file1+' : '+err);
            socket.emit('err',err);
            });
    });
});

app.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 80, process.env.IP || '127.0.0.1', function () {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});







