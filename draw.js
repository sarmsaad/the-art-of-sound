var colorRed = "#ff3232";
var colorGreen = "#00e164";
var colorBlue = "#0064e1";
var curColor = colorRed;
var curSize = 50;
var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();
var clickTool = new Array();
var clickSize = new Array();
var clickDrag = new Array();
var paint = true;
// var mediumStartX = 18;
// var mediumStartY = 19;
// var mediumImageWidth = 20;
// var mediumImageHeight = 20;
var drawingAreaX = 111;
var drawingAreaY = 11;
var drawingAreaWidth = 1450;
var drawingAreaHeight = 500;
var canvasWidth = drawingAreaWidth;
var canvasHeight = drawingAreaHeight;
var sizeHotspotWidthObject = {
    normal: 18
}

var outlineImage = new Image();

/**
 * Calls the redraw function after all neccessary resources are loaded.
 */
function resourceLoaded()
{
    if(++curLoadResNum >= totalLoadResources){
        redraw();
    }
}

/**
 * Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
 */
function prepareCanvas()
{
    // Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
    var canvasDiv = document.getElementById('canvass');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if(typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }

    outlineImage.onload = function() { resourceLoaded();
    };
    outlineImage.src = "images/bg.gif"
    context = canvas.getContext("2d"); // Grab the 2d canvas context
    // Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
    //     context = document.getElementById('canvas').getContext("2d");



    // Add mouse events
    // ----------------
    $('#canvas').mousedown(function(e)
    {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        //
        // if(mouseX > mediumStartX)
        // {
        //     if(mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight){
        //         curColor = colorRed;
        //     }else if(mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2){
        //             curColor = colorGreen;
        //     }else if(mouseY > mediumStartY + mediumImageHeight * 2 && mouseY < mediumStartY + mediumImageHeight * 3){
        //             curColor = colorBlue;
        //     }
        // }

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $('#canvas').mousemove(function(e){
        if(paint==true){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    $('#canvas').mouseup(function(e){
        paint = false;
        redraw();
    });

    $('#canvas').mouseleave(function(e){
        paint = false;
    });
}

/**
 * Adds a point to the drawing array.
 * @param x
 * @param y
 * @param dragging
 */
function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(curColor);
    clickSize.push(curSize);
    clickDrag.push(dragging);
}

function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    // Keep the drawing in the drawing area
    context.save();
    context.beginPath();
    context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
    context.clip();

    var radius;
    var i = 0;
    for(; i < clickX.length; i++)
    {
    	context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i], clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.strokeStyle = clickColor[i];
        context.lineJoin = "round";
        context.lineWidth = radius;
        context.stroke();
    }
    //context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
    context.restore();

    // Draw the outline image
    //context.drawImage(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
}