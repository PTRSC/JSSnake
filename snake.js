/*
   Date: 4th of August 2017
   version 0.1
   All source under GPL version 3 or latter
   (GNU General Public License - http://www.gnu.org/)
   contact martin@linux.com for more information about this code
*/

function Snake(headX, headY, blockSize, headColour, bodyColour) {
	this.headX = headX;
	this.headY = headY;

	this.blockSize = blockSize;
	this.headColour = headColour;
	this.bodyColour = bodyColour;
	this.body = [];
	this.direction = "WEST";
	this.speed = 1;
	this.growing = 0;

	var b = new Block(this.headX + this.blockSize, this.headY, 
			  this.blockSize, this.bodyColour);
	this.body.push(b);
}

Snake.prototype.show = function() {
	noStroke();
	fill(255)
	rect(this.headX,this.headY,this.blockSize,this.blockSize);
	for (var i = 0; i < this.body.length; i++) {
		this.body[i].show();
	}
}

Snake.prototype.grow = function(v) {
	this.growing = this.growing + v;
}

Snake.prototype.move = function() {
	var len = this.body.length;
	var oldPosX;
	var oldPosY;
	var b;

	if (this.growing == 0) {
		for (var i = 1; i < len; i = i + 1) {
			oldPosX = this.body[i].xpos;
			oldPosY = this.body[i].ypos;
			this.body[i-1].newPosition(oldPosX,oldPosY);
		}
		this.body[len-1].newPosition(this.headX,this.headY);
	} else {
		b = new Block(this.headX, this.headY, 
			      this.blockSize, this.bodyColour);
		this.body.push(b);
		this.growing = this.growing - 1;
	}

	if (this.direction == "WEST") {
		this.headX = this.headX - this.blockSize;
	}
	if (this.direction == "NORTH") {
		this.headY = this.headY - this.blockSize;
	}
	if (this.direction == "SOUTH") {
		this.headY = this.headY + this.blockSize;
	}
	if (this.direction == "EAST") {
		this.headX = this.headX + this.blockSize;
	}
}

Snake.prototype.changeDirectionUp = function() {
	if (this.direction != "SOUTH") {
		this.direction = "NORTH";
	}
}

Snake.prototype.changeDirectionDown = function() {
	if (this.direction != "NORTH") {
		this.direction = "SOUTH";
	}
}

Snake.prototype.changeDirectionLeft = function() {
	if (this.direction != "EAST") {
		this.direction = "WEST";
	}
}

Snake.prototype.changeDirectionRight = function() {
	if (this.direction != "WEST") {
		this.direction = "EAST";
	}
}

Snake.prototype.collision = function() {
	var i;

	if (this.headX < blockSize) return true;
	if (this.headY < blockSize) return true;
	if (this.headX >= width - this.blockSize) return true;
	if (this.headY >= height - this.blockSize) return true;

	for (i = 0; i < this.body.length-1; i++) {
		if ((this.headX == this.body[i].xpos) && 
	            (this.headY == this.body[i].ypos)) return true;
	}

	return false;
}


