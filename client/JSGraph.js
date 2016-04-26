

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

function curve(stepX,stepY,numberX,numberY) {
    var y=10,x=20;
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
        stepX++;
        if (numberX) {
            if (stepX%numberX==0){
            write(canvas,stepX,x,originY+10);
            }
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
        stepY--;
        if (numberY) {
            if (stepY%numberY==0){
                write(canvas,stepY,originX-10,y);
            }
        }
    }
}

curve(0,31,5,5);
