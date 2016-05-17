var http = require('http');
var path = require('path');
var url = require('url');
var socketio = require('socket.io');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
var jsonfile = require('jsonfile');

var file=['sample.json','sampleFutur.json','sampleCurve.json'];

function present(array) {
    var present=[jsonfile.readFileSync(file[0]).tWell,
        jsonfile.readFileSync(file[0]).tHumi,
        jsonfile.readFileSync(file[0]).tVMC];
        
    if (array==null) {
        return present
    }
    else {
        return present[array]
    }
}

function dataCurve(time) {
    var data=jsonfile.readFileSync(file[2]).data,dataFutur=[];
    for(var i=data.length-1;i>-1;i--) {
        if (time.year==data[i].year && time.mouth==data[i].mouth && time.date==data[i].date) {
            dataFutur.push(data[i]);
        }
    }
    return dataFutur
}

    io.sockets.on('connection', function (socket) {
        socket.emit('data',present());
        console.log("Un client s'est connecté !");
        
    socket.on('input', function (input) {
        console.log("input : "+input);
        var inputF={tWell: input[0],tHumi: present(1), tVMC: input[1]};
        jsonfile.writeFile(file[1],inputF, function (err) {
            console.error("Erreur de l'écriture de : "+file[1]+' : '+err);
            socket.emit('err',err);
            });
    });
    
    socket.on('time', function(time) {
       socket.emit('dataCurve',dataCurve(time));
    });
});

app.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 8080, process.env.IP || '0.0.0.0', function () {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});

