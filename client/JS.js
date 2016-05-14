var y,x2,time,minutes,hours,input1,input2,input;
var socket = io.connect();

function write(canvas,txt,x,y){
    $(canvas).drawText({
        fillStyle: 'black',
        strokeStyle: 'black',
        strokeWidth: 0, //Met en gras par defaut
        x: x, y: y,
        fontSize: '1.2em',
        fontFamily: 'sans-serif,serif',
        text: txt
    });
        x2=230;
}

function mercury(degree){
    $("#thermometer").drawRect({
        fillStyle: 'blue',
        x: 142, y: 416,
        width: 25, height: degree*(-10)-6,
        fromCenter: false
    });
}

function beginThermometer(){
y=410; //0 °C
x2=210;
$("#thermometer").drawLine({
    strokeStyle: "white",
    strokeWidth: 8,
    x1: 130, y1: 420,
    x2: 130, y2: 0, //Echelle 10=1 °C
    x3: 180, y3: 0,
    x4: 180, y4: 420,
    closed: true
});

while(y>0){
    switch (y) {
        case 410:
            write("#thermometer","0",245,y);
            break;
        case 360:
            x2=220;
            break;
        case 310:
            write("#thermometer","10",250,y);
            break;
        case 260:
            x2=220;
            break;
        case 210:
            write("#thermometer","20",250,y);
            break;
        case 160:
            x2=220;
            break;
        case 110:
            write("#thermometer","30",250,y);
            break;
        case 60:
            x2=220;
            break;
        case 10:
            write("#thermometer","40 °C",260,y);
            break;
    }
    
    $("#thermometer").drawLine({
        strokeStyle: "black",
        strokeWidth: 4,
        x1: 180, y1: y,
        x2: x2, y2: y
    });
    y-=10;
    x2=210;
}
}

function informationCanvas(element,valeur) {
    $('#thermometer').clearCanvas();
    beginThermometer();
    mercury(valeur);
    $('#information li').css('font-weight','normal');
    $(element).css('font-weight','bold');
}

socket.on('data', function(data) {
    $("#temperatureWell").text('Température extérieur du puit : '+data[0]+" °C");
    $('#humidity').text('Taux d\'humidité : '+data[1]+' %');
    $('#temperatureVMC').text('Température de la VMC : '+data[2]+' °C');
    
    $('#temperatureVMC').click(function () {
        informationCanvas(this,data[2]);
    });
    
    $('#temperatureWell').click(function () {
        informationCanvas(this,data[0]);
    });
    informationCanvas('#temperatureWell',data[0]);
});

$('#sumbit1').click(function () {
	if ($.isNumeric($('input[type="number"]').val())) {
		alert("Vous n'avez pas rentré un nombre dans un des champs");
    }
	else {
		input=[parseInt($('#input0').val()),parseInt($('#input1').val())];
		if (confirm('Vous confirmez :\n Température du puit : '+input[0]+'\n Température de la VMC : '+input[1])) {
			socket.emit("input",input);
			socket.on('err', function(err) {
				if (err==null) {
					alert("Données envoyé !");
				}
				else {
					alert("Donnée non envoyé à cause d'une erreur ("+err+")");
				}
		});
	}
	else {
        alert('Donnée non envoyé.');
	}
	}
}

beginThermometer();
alert("Température affiché actuellement est : Température extérieur du puit");
