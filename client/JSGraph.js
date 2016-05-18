var setNumberX=5, setNumberY=5,setGridX,setGridY,setFont=0.7,setPoint=0,dataCurveClient;
var socket = io.connect(),time=new Date;
var timeJSON = {"date":time.getDate(),"mouth":time.getMonth(),"year":time.getFullYear()};

function write(canvas,txt,x,y,font,layer,name,group){
    $(canvas).drawText({
        fillStyle: 'black',
        strokeStyle: 'black',
        strokeWidth: 0, //Met en gras par defaut
        x: x, y: y,
        fontSize: font+'em',
        fontFamily: 'sans-serif,serif',
        text: txt,
        layer:layer,
        name:name,
        group:group
    });
}

function point(canvas,x,y) {
    $(canvas).drawEllipse({
        fillStyle: '#c33',
        x:x*20+20, y:630-y*20,
        width: 10, height: 10,
        layer:true,
        name:'point'+setPoint,
        groups:'points'
    });
    setPoint++;
}

function curve(totalX,totalY,numberX,numberY,gridX,gridY,font,points){ 
    var y=10,x=20;
    var originX=20,maxX=640,originY=630,maxY=700,canvas='canvas';
    $('canvas').removeLayers();
    $('canvas').clearCanvas();
    $(canvas).drawLine({
        strokeStyle: "black",
        strokeWidth: 4,
        x1:originX, y1:0,
        x2:originX, y2:maxY,
        x3:originX, y3:originY,
        x4:maxX, y4:originY,
        layer:true,
        name:'lines'
    });
    while(x<maxX) {
        $(canvas).drawLine({
           strokeStyle: 'black',
           strokeWidth: 3,
           x1:x, y1:originY,
           x2:x, y2:originY-10,
           layer:true,
           name:'linesX'+totalX,
           groups:'linesX'
        });
        x=x+20;
        totalX++;
        if (gridX) {
        $(canvas).drawLine({
               strokeStyle: 'gray',
               strokeWidth: 1,
               x1:x, y1:originY+2,
               x2:x, y2:maxY,
               layer:true,
               name:'gridXN'+totalX,
               groups:'gridX'
            });
        $(canvas).drawLine({
                strokeStyle: 'gray',
                strokeWidth: 1,
                x1:x, y1:originY-10,
                x2:x, y2:0,
                layer:true,
                name:'gridXP'+totalX,
                groups:'gridX'
            });
        }
        if (numberX) {
            if (totalX%numberX==0){
            write(canvas,totalX,x,originY+10,font,true,'writeX'+totalX,'writeX');
            }
        }
    }
    while(y<maxY) {
        $(canvas).drawLine({
            strokeStyle: 'black',
            strokeWidth: 3,
            x1:originX, y1:y,
            x2:originX+10, y2:y,
            layer:true,
            name:'lineY'+totalY,
            group:'linesY'
        });
        if (gridY && totalY!=0) {
            $(canvas).drawLine({
               strokeStyle: 'gray',
               strokeWidth: 1,
               x1:originX+10, y1:y,
               x2:maxX, y2:y,
               layer:true,
               name:'gridY'+totalY,
               group:'gridY'
            });
        }
        y=y+20;
        totalY--;
        if (numberY) {
            if (totalY%numberY==0){
                write(canvas,totalY,originX-10,y,font,true,'writeY'+totalY,'writeY');
            }
        }
    }
    for(var i=points.length-1;i>-1;i--) {
        point('canvas',points[i].hours,points[i].tWell);
    }
}

socket.on('data', function(data) {
    $("#temperatureWell").text('Température extérieur du puit : '+data[0]+" °C");
    $('#humidity').text('Taux d\'humidité : '+data[1]+' %');
    $('#temperatureVMC').text('Température de la VMC : '+data[2]+' °C');
});

$('#normal').click(function () {
    $('#future tbody,tfoot').css('display','none');
    $('#choiceDate').css("margin-top","300px");
    curve(0,31,5,5,false,false,'0.7',dataCurveClient);
});

$('#custom').click(function() {
    $('#future tbody,tfoot').css('display','block');
    $('#choiceDate').css("margin-top","490px");
    curve(0,31,setNumberX,setNumberY,setGridX,setGridY,setFont,dataCurveClient);
});

function setGrid(checkbox) {
    var check;
    if (checkbox.checked) {
        check=true;
    }
    else {
        check=false;
    }
    if (checkbox.id=='gridX') {
        setGridX=check;
    }
    else if (checkbox.id=='gridY') {
        setGridY=check;
    }
    curve(0,31,setNumberX,setNumberY,setGridX,setGridY,setFont,dataCurveClient);
}

function number(xy) {
    if (xy.id=='numberX') {
        setNumberX = parseInt(xy.value);
    }
    else if (xy.id=='numberY') {
        setNumberY = parseInt(xy.value);
    }
    else {
        alert("Erreur !\nDonnées envoyé inconnues");
    }
    curve(0,31,setNumberX,setNumberY,setGridX,setGridY,setFont,dataCurveClient);
}

function dataC(data) {
    var day,mouth;
    switch (dataCurveClient[0].day) {
        case 0: 
            day='Dimanche';
            break;
        case 1:
            day='Lundi';
            break;
        case 2:
            day='Mardi';
            break;
        case 3:
            day='Mercredi';
            break;
        case 4:
            day='Jeudi';
            break;
        case 5:
            day='Vendredi';
            break;
        case 6:
            day='Samedi';
            break;
    }
    switch (dataCurveClient[0].mouth) {
        case 0:
            mouth='janvier';
            break;
        case 1:
            mouth='février';
            break;
        case 2:
            mouth='mars';
            break;
        case 3:
            mouth='avril';
            break;
        case 4:
            mouth='mai';
            break;
        case 5:
            mouth='juin';
            break;
        case 6:
            mouth='juillet';
            break;
        case 7:
            mouth='août';
            break;
        case 8:
            mouth='septembre';
            break;
        case 9:
            mouth='octobre';
            break;
        case 10:
            mouth='novembre';
            break;
        case 11:
            mouth='décembre';
            break;
    }
    curve(0,31,setNumberX,setNumberY,false,false,setFont,data);
    $('#choiceDate h2').text(day+' '+dataCurveClient[0].date+' '+mouth+' '+dataCurveClient[0].year);
}

$("input[name='font']").click(function() {
   if ($(this).val()=='+') {
       setFont=setFont+0.1;
   }
   else if (this.value=='-') {
       setFont=setFont-0.1;
   }
   curve(0,31,setNumberX,setNumberY,setGridX,setGridY,setFont,dataCurveClient);
});

socket.emit('time',{"date":time.getDate(),"mouth":time.getMonth(),"year":time.getFullYear()});
socket.on('dataCurve',function (dataCurve) {
    if (dataCurve[0]) {
        dataCurveClient=dataCurve;
    }
    else {
        alert("Pas donnée pour cette date : \n"+timeJSON.date+'/'+timeJSON.mouth+'/'+timeJSON.year);
        timeJSON.date=dataCurveClient[0].date;
        timeJSON.mouth=dataCurveClient[0].mouth;
        timeJSON.year=dataCurveClient[0].year;
    }
    dataC(dataCurveClient);
});

$('#choiceDate input[name="date"]').click(function () {
    var date
    if (this.value=='Date Suivante') {
       if (timeJSON.date+1==31 && timeJSON.mouth%2==0 || timeJSON.date+1==30 && timeJSON.mouth%2!=0 || timeJSON.date+1==27 && timeJSON.mouth==1 && timeJSON.year%4==0 || timeJSON.date+1==28 && timeJSON.mouth==1 && timeJSON.year%4!=0) {
           if (timeJSON.mouth+1==13) {
               timeJSON.year=timeJSON.year+1;
               timeJSON.mouth=0;
           }
           else {
               timeJSON.mouth=timeJSON.mouth+1;
           }
           timeJSON.date=1;
       }
       
       else {
           timeJSON.date=timeJSON.date+1;
       }
   }
   
    else if (this.value=='Date Précedente') {
       if (timeJSON.date-1==0) {
           if (timeJSON.mouth-1==-1) {
               timeJSON.year-=1;
               timeJSON.mouth=11;
               timeJSON.date=31;
           }
           else if (timeJSON.mouth%2==0) {
               timeJSON.date=30;
           }
           else if (timeJSON.mouth==2 && timeJSON.year%4==0) {
               timeJSON.date=28;
           }
           else if (timeJSON.mouth==2 && timeJSON.year%4!=0) {
               timeJSON.date=27;
           }
           else if (timeJSON.mouth%2!=0) {
               timeJSON.date=31;
           }
           else {
               timeJSON.date=timeJSON.date-1;
           }
       }
       else {
           timeJSON.date=timeJSON.date-1;
       }
   }
   
    else if (this.value=="Envoyé") {
        date=$('#choiceDate input[type="date"]').val().split('-',3);
        timeJSON={"year":parseInt(date[0]),"mouth":parseInt(date[1])-1,"date":parseInt(date[2])};
    }
   
    socket.emit('time',timeJSON);
});

$('#numberX').val('5');
$('#numberY').val('5');
