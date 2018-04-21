var colorRed = "#cb3594";
var colorGreen = "#659b41";
var colorBlue = "#ffcf33";
var colorBrown = "#986928";
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
    var canvasDiv = document.getElementById('canvasDiv');
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
        // Mouse down location
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        if(mouseX < drawingAreaX) // Left of the drawing area
        {
            if(mouseX > mediumStartX)
            {
                if(mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight){
                    curColor = colorPurple;
                }else if(mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2){
                    curColor = colorGreen;
                }else if(mouseY > mediumStartY + mediumImageHeight * 2 && mouseY < mediumStartY + mediumImageHeight * 3){
                    curColor = colorYellow;
                }else if(mouseY > mediumStartY + mediumImageHeight * 3 && mouseY < mediumStartY + mediumImageHeight * 4){
                    curColor = colorBrown;
                }
            }
        }
        else if(mouseX > drawingAreaX + drawingAreaWidth) // Right of the drawing area
        {
            if(mouseY > toolHotspotStartY)
            {
                if(mouseY > sizeHotspotStartY)
                {
                    var sizeHotspotStartX = drawingAreaX + drawingAreaWidth;
                    if(mouseY < sizeHotspotStartY + sizeHotspotHeight && mouseX > sizeHotspotStartX)
                    {
                        if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge){
                            curSize = "huge";
                        }else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
                            curSize = "large";
                        }else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
                            curSize = "normal";
                        }else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.small + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
                            curSize = "small";
                        }
                    }
                }
                else
                {
                    if(mouseY < toolHotspotStartY + toolHotspotHeight){
                        curTool = "crayon";
                    }else if(mouseY < toolHotspotStartY + toolHotspotHeight * 2){
                        curTool = "marker";
                    }else if(mouseY < toolHotspotStartY + toolHotspotHeight * 3){
                        curTool = "eraser";
                    }
                }
            }
        }
        else if(mouseY > drawingAreaY && mouseY < drawingAreaY + drawingAreaHeight)
        {
            // Mouse click location on drawing area
        }
        paint = true;
        addClick(mouseX, mouseY, false);
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

