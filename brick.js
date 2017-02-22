var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var notDone = true;
var score = 0;
var scoreColour = "#000000";
var gameOverColour = "#FF2222";
var gameWinColour = "#00CC22";
	
var ballColour = "#0095DD";
var ballRadius = 10;
var xBall = canvas.width/2;
var yBall = canvas.height-30;
var xVelocity = 2;
var yVelocity = -2;
var changeX = 0;
		
var paddleHeight = 10;
var paddleWidth = 75;
var xPaddle = (canvas.width-paddleWidth)/2;
var paddleColour = "#0095DD";
var rightPressed = false;
var leftPressed = false;
var paddleVelocity = 5;
		
var brickRowCount = 3;
var brickColCount = 5;
var brickWidth = 75;
var brickHeight=30;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickColour = "#00CC22";
var bricks = new Array(brickColCount);
bricksNotCreated=true;
var c;
var r;

function reloadPage(){
	document.location.reload();
}

function gameOver(){
	context.font="32px Arial";
	context.fillStyle = gameOverColour;
	context.fillText("Game Over!", 160, 180);
	notDone=false;
}

function drawScore(){
	context.font="16px Arial";
	context.fillStyle = scoreColour;
	context.fillText("Score: " + score, 8, 20);
}
function createBricks(){
	for(c=0; c < brickColCount; c++) {
		bricks[c] = new Array(brickRowCount);
		for(r=0; r < brickRowCount; r++) {
			bricks[c][r] = { x: 0, y: 0, status:1 };
		}
	}
	bricksNotCreated=false;
}
		
function drawBricks() {
	for(c=0; c<brickColCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1){
			
				var xBrick = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var yBrick = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = xBrick;
				bricks[c][r].y = yBrick;
				context.beginPath();
				context.rect(xBrick, yBrick, brickWidth, brickHeight);
				context.fillStyle = brickColour;
				context.fill();
				context.closePath();
			}
		}
	}
}

function collisionDetection(){
	for(c=0; c<brickColCount; c++){
		for(r=0; r<brickRowCount; r++){
			var checkBrick = bricks[c][r];
			if(checkBrick.status==1){
				if(xBall > checkBrick.x && xBall < checkBrick.x+brickWidth && yBall>checkBrick.y && yBall<checkBrick.y+brickHeight){
					yVelocity *=-1;
					checkBrick.status=0;
					score++;
					winCheck();
				}
			}
		}
	}
}
	
function drawBall(){
	context.beginPath();
	context.arc(xBall, yBall, ballRadius, 0, Math.PI*2);
	context.fillStyle = ballColour;
	context.fill();
	context.closePath();
}

function drawPaddle(){
	context.beginPath();
	context.rect(xPaddle, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	context.fillStyle = paddleColour;
	context.fill();
	context.closePath();
}

function gameSetup(){
	createBricks();
	drawBricks();
	drawPaddle();
	drawScore();
}

function draw(){
	if(notDone){
		context.clearRect(0,0,canvas.width, canvas.height);
		if(bricksNotCreated){
			createBricks();
		}
		collisionDetection();
		drawBricks();
		drawBall();
		drawPaddle();
		drawScore();
		ballHitCheck();
	}
	
	
	
	if(rightPressed && xPaddle + paddleWidth < canvas.width){
		xPaddle += paddleVelocity;
	}
	else if(leftPressed && xPaddle > 0){
		xPaddle -= paddleVelocity;
	}
	
	xBall += xVelocity;
	yBall += yVelocity;
}

function winCheck(){
	if(score == (brickColCount* brickRowCount)){
		context.font="32px Arial";
		context.fillStyle = gameWinColour;
		context.fillText("You Win!", 165, 180);
		notDone=false;
	}
}

function ballHitCheck(){
	//<!-- if ball hits a wall, reverse X velocity -->
	if(xBall + xVelocity > canvas.width - ballRadius || xBall + xVelocity < ballRadius){
		xVelocity *= -1;
	}
	//<!-- if ball hits the roof, reverse Y veloxity -->
	if(yBall + yVelocity < ballRadius){
		yVelocity *= -1;
	}
	//<!-- if ball hits the ground -->
	else if (yBall + yVelocity > canvas.height - ballRadius){
		//<!-- if ball hits the paddle, reverse Y velocity -->
		if(xBall > xPaddle && xBall < xPaddle + paddleWidth){
			yVelocity *= -1;
			//<!-- X velocity is changed depending on where it hit the paddle-->
			changeX = xBall-xPaddle;
		
			if(changeX<25){
				xVelocity-=1;
			}
			else if(changeX>50){
				xVelocity+=1;
			}
			
		}
		//<!-- if ball misses the paddle, game over or lose a life -->
		else{
			gameOver();
		}
	}
}

function setMyInterval(){
	setInterval(draw,10);
}
		
function keydownHandler(e){
	if(e.keyCode == 39){
		rightPressed = true;
	}
	else if(e.keyCode == 37){
		leftPressed = true;
	}
}

function keyupHandler(e){
	if(e.keyCode == 39){
		rightPressed = false;
	}
	else if(e.keyCode == 37){
		leftPressed = false;
	}
}
document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);