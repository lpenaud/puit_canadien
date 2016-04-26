

function write(canvas,txt,x,y){
    $(canvas).drawText({
        fillStyle: 'black',
        strokeStyle: 'black',
        strokeWidth: 0, //Met en gras par defaut
        x: x, y: y,
        fontSize: '0.7em',
        fontFamily: 'sans-serif,serif',
        text: txt
    });
}

function begin() {
    var y=10,x=20,xi=0,yi=31;
    var originX=20,maxX=640,originY=630,maxY=700,canvas='canvas';
    $(canvas).drawLine({
        strokeStyle: "black",
        strokeWidth: 4,
        x1:originX, y1:0,
        x2:originX, y2:maxY,
        x3:originX, y3:originY,
        x4:maxX, y4:originY,
    });
    while(x<maxX) {
        $(canvas).drawLine({
           strokeStyle: 'black',
           strokeWidth: 3,
           x1:x, y1:originY,
           x2:x, y2:originY-10
        });
        x=x+20;
        xi++;
        if (xi%5==0){ //Penser peut-être à mettre une échelle donnée par le client ? Ou déjà ajouté des checkbox.
            write(canvas,xi,x,originY+10);
        }
    }
    while(y<maxY) {
        $(canvas).drawLine({
            strokeStyle: 'black',
            strokeWidth: 3,
            x1:originX, y1:y,
            x2:originX+10, y2:y
        });
        y=y+20;
        yi--;
        if (yi%5==0){
            write(canvas,yi,originX-10,y);
        }
    }
}

begin();
