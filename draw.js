var colorRed = "#cb3594";
var colorGreen = "#659b41";
var colorBlue = "#ffcf33";
var curColor = colorRed;
var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();
var clickTool = new Array();
var clickSize = new Array();
var clickDrag = new Array();
var paint = false;

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
    context = canvas.getContext("2d"); // Grab the 2d canvas context
    // Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
    //     context = document.getElementById('canvas').getContext("2d");



    // Add mouse events
    // ----------------
    $('#canvas').mousedown(function(e)
    {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

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


        context.lineJoin = "round";
        context.lineWidth = radius;
        context.stroke();

    }
    //context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
    context.restore();

    // Overlay a crayon texture (if the current tool is crayon)
    if(curTool == "crayon"){
        context.globalAlpha = 0.4; // No IE support
        context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
    }
    context.globalAlpha = 1; // No IE support

    // Draw the outline image
    context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
}