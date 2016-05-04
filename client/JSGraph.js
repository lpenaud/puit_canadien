var setNumberX=5, setNumberY=5,setGridX,setGridY,setFont=0.7,setPoint=0;
var socket = io.connect(),time=new Date;

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
}

function curve(totalX,totalY,numberX,numberY,gridX,gridY,font){ 
    var y=10,x=20;
    var originX=20,maxX=640,originY=630,maxY=700,canvas='canvas';
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
    point('canvas',10,30);
}

$('#normal').click(function () {
    $('#future tbody,tfoot').css('display','none');
    curve(0,31,5,5,false,false,'0.7');
});

$('#custom').click(function() {
    $('#future tbody,tfoot').css('display','flex');
    curve(0,31,setNumberX,setNumberY,setGridX,setGridY,setFont);
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
    curve(0,31,setNumberX,setNumberY,setGridX,setGridY,setFont);
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
    curve(0,31,setNumberX,setNumberY,setGridX,setGridY,setFont);
}
$("input[name='font']").click(function() {
   if ($(this).val()=='+') {
       setFont=setFont+0.1;
   }
   else if (this.value=='-') {
       setFont=setFont-0.1;
   }
   curve(0,31,setNumberX,setNumberY,setGridX,setGridY,setFont);
});

socket.emit('time',{"date":time.getDate(),"mouth":time.getMonth(),"year":time.getFullYear()});
socket.on('dataCurve',function (dataCurve) {
   
});

curve(0,31,setNumberX,setNumberY,true,true,setFont);
$('#numberX').val('5');
$('#numberY').val('5');
