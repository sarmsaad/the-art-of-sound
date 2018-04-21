var drawing = (function(){

	var canvas,
		context,
		canvasWidth = 600,
		canvasHeight = 600,
		moveX = [],
		moveY = [],
		moveDrag = [],
		paint = false,
		// Colors
		colorRed = "#FF3232",
        colorGreen = "00E164",
        colorBlue = "0064E1",
        curColor = colorRed;,
        clickColor = new Array();,

		addClick = function (x,y,dragging){
			moveX.push(x);
			moveY.push(y);
			moveDrag.push(dragging);
			clickColor.push(curColor);


		},

		clearCanvas = function() {
		    context.clearRect(0,0,canvasWidth, canvasHeight)
		},

		redrew = function() {

		}

	init = function () {
		canvas = document.createElement('canvas');
		canvas.setAttribute('width', canvasWidth);
		canvas.setAttribute('height', canvasHeight);
		canvas.setAttribute('id', 'canvas');
		document.getElementById('canvass').appendChild(canvas);

		context = canvas.getContext("2d");

	};
	return {
		init:int
	};
}());