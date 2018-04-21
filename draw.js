var drawing = (function(){

	var canvas,
		context,
		canvasWidth = 600,
		canvasHeight = 600,
		moveX = [],
		moveY = [],
		moveDrag = [],
		paint = false,

		addClick = function (x,y,dragging){
			moveX.push(x);
			moveY.push(y);
			moveDrag.push(dragging);
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