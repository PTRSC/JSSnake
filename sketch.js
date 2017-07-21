var snake;
var blockSize = 20;

var foods = [];

function setup() {
	var f;

	createCanvas(1200,700)
	snake = new Snake(width-10*blockSize,height/2,blockSize,200,100)

	for (var i=1; i<=3; i++) {
		f = new Food(i*2);
		foods.push(f);
	}
		
}

function drawBorder() {
	noStroke();
	fill(0,255,0);
	rect(0,0,width,height);
	fill(0);
	rect(blockSize,blockSize,width-2*blockSize,height-2*blockSize);
}

function gameOver() {
    var start_text="Game Over. Points = " + snake.body.length;
    textFont("Courier");
    textSize(32);
    text(start_text,0.5*(width-textWidth(start_text)),0.5*(height-16))
}

function draw() {
	frameRate(map(snake.body.length,3,200,10,50));
	background(0);
	drawBorder();
	snake.show();
	if (snake.collision()) {
		noLoop();
		gameOver();
		return;
	}
	snake.move();
	for (var i = 0; i < foods.length; i++) {
		foods[i].show();
	}

	for (var i = 0; i < foods.length; i++) {
		if (foods[i].collision(snake.headX, snake.headY)) {
			snake.grow(foods[i].value);
			foods[i].newPosition();
		}
	}
}

function keyPressed() {
	if (keyCode == LEFT_ARROW) {
		snake.changeDirectionLeft();
	}
	if (keyCode == RIGHT_ARROW) {
		snake.changeDirectionRight();
	}
}