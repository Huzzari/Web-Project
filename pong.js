//canvas
var canvas = document.getElementById("pongCanvas");
var context = canvas.getContext("2d");

//both players
var paddleHeight = 10;
var paddleWidth = 75;
var paddleVelocity = 5;

//player 1
var xPaddle1 = (canvas.width-paddleWidth)/2;
var paddleColour1 = "#00CC22";
var rightPressed1 = false;
var leftPressed1 = false;
var p1Score = 0;

//player 2
var xPaddle2 = (canvas.width-paddleWidth)/2;
var paddleColour2 = "#CC2200";
var rightPressed2 = false;
var leftPressed2 = false;
var p2Score = 0;

//ball
var ballColour = "#0095DD";
var ballRadius = 10;
var xBall = canvas.width/2;
var yBall = canvas.height/2;
var xVelocity = 2;
var yVelocity = -2;
var changeX = 0;
var lastPlayer = 2;

//other
var interval = 10;
var noPause = true;
var pointColour = "#333333"; 
var midLineColour = "#DDDDDD";

//main function to draw frames
function draw(){
	if(noPause){//if not paused
	
		context.clearRect(0,0,canvas.width,canvas.height);
		drawScore();
		collisionCheck();
		drawBall();
		drawPaddles();
		movePaddles();
	
		xBall += xVelocity;
		yBall += yVelocity;
	}
}

function drawBall(){
	//draws ball on the canvas
	context.beginPath();
	context.arc(xBall, yBall, ballRadius, 0, Math.PI*2)
	context.fillStyle= ballColour;
	context.fill();
	context.closePath();
}

function drawPaddles(){
	context.beginPath();
	context.rect(xPaddle1, 0, paddleWidth, paddleHeight);
	context.fillStyle = paddleColour1;
	context.fill();
	context.closePath();
	
	context.beginPath();
	context.rect(xPaddle2, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	context.fillStyle = paddleColour2;
	context.fill();
	context.closePath();
}

function drawScore(){
	//draw mid line
	context.beginPath();
	context.rect(0, (canvas.height/2)-1, canvas.width, 2);
	context.fillStyle = midLineColour;
	context.fill()
	context.closePath();
	
	//draw P1 Score
	context.font = "64px Arial";
	context.fillStyle = midLineColour;
	context.fillText(""+p1Score, 10, (canvas.height/2)-12);
	//draw P2 score
	context.font = "64px Arial";
	context.fillStyle = midLineColour;
	context.fillText(""+p2Score, 10, (canvas.height/2)+57);
}

function checkWin(){
	if(p1Score==5){
		//player one win
		context.clearRect(0,0,canvas.width,canvas.height);
		drawScore();
		drawBall();
		drawPaddles();
		context.font = "32px Arial";
		context.fillStyle = paddleColour1;
		context.fillText("Player 1 Wins!", 180, canvas.height/2 + 11);
	}
	else if(p2Score==5){
		//player 2 wins
		context.clearRect(0,0,canvas.width,canvas.height);
		drawScore();
		drawBall();
		drawPaddles();
		context.font = "32px Arial";
		context.fillStyle = paddleColour2;
		context.fillText("Player 2 Wins!", 180, canvas.height/2 + 11)
	}
	else{//no winner yet
		setTimeout(resetBall,2000);
	}
}

function resetBall(){
	setPause();
	yVelocity *= -1;
	xVelocity = 1;
	xBall = canvas.width/2;
	yBall = canvas.height/2;
	xPaddle1 = ((canvas.width-paddleWidth)/2);
	xPaddle2 = ((canvas.width-paddleWidth)/2);
}

function playerScores(){
	var scored = lastPlayer;
	if(lastPlayer == 2){
		lastPlayer = 1;
		p2Score++;
	}
	else{
		lastPlayer=2;
		p1Score++;
	}
	context.clearRect(0,0,canvas.width,canvas.height);
	drawScore();
	drawBall();
	drawPaddles();
	context.font = "32px Arial";
	context.fillStyle = pointColour;
	context.fillText("Player " + scored + " scored!", 180, canvas.height/2 + 11);
	setPause();
	checkWin()
}

function movePaddles(){
	//move P2 (bottom) paddle
	if(rightPressed2 && xPaddle2 + paddleWidth< canvas.width){
		xPaddle2 += paddleVelocity;
	}
	if(leftPressed2 && xPaddle2 > 0){
		xPaddle2 -= paddleVelocity;
	}
	//move p1 (top) paddle
	if(rightPressed1 && xPaddle1 + paddleWidth< canvas.width){
		xPaddle1 += paddleVelocity;
	}
	if(leftPressed1 && xPaddle1 > 0){
		xPaddle1 -= paddleVelocity;
	}
}

function collisionCheck(){
	//check for wall collision.
	if(xBall + xVelocity > canvas.width - ballRadius || xBall+ xVelocity < 0 + ballRadius){
		xVelocity *=-1;//flip the X direction on wall collision
	}
	//check for top collision
	if(yBall + yVelocity < 0 + ballRadius){
		//check for paddle collision
		if(xBall > xPaddle1 && xBall < xPaddle1 + paddleWidth){
			yVelocity *= -1;//reverse direction if paddle is hit
			if(lastPlayer == 2){//switch who hit the ball last
				lastPlayer = 1;
			}
			else{
				lastPlayer=2;
			}
			//X velocity is altered depending where on the paddle was hit
			changeX = xBall-xPaddle1;
			if(changeX<25){
				xVelocity-=1;
			}
			else if(changeX>50){
				xVelocity+=1;
			}
		}
		else{//paddle is not hit
			playerScores();//reset ball and increment score
		}
	}
	//check for paddle2/bottom collision
	if(yBall + yVelocity > canvas.height - ballRadius){
		//check for paddle collision
		if(xBall > xPaddle2 && xBall < xPaddle2 + paddleWidth){
			yVelocity *= -1;//reverse direction if paddle is hit
			if(lastPlayer == 2){//switch who hit the ball last
				lastPlayer = 1;
			}
			else{
				lastPlayer=2;
			}
			//X velocity is altered depending where on the paddle was hit
			changeX = xBall-xPaddle2;
			if(changeX<25){
				xVelocity-=1;
			}
			else if(changeX>50){
				xVelocity+=1;
			}
		}
		else{//paddle is not hit
			playerScores();//reset ball and increment score
		}
	}
		
}

function setPause(){
	if(noPause == false){
		noPause=true;
	}
	else{
		noPause=false;
	}
}

function start(){
	setInterval(draw,10);
}

function keydownHandler(e){
	if(e.keyCode == 39){
		rightPressed2 = true;
	}
	else if(e.keyCode == 37){
		leftPressed2 = true;
	}
	else if(e.keyCode == 68){
		rightPressed1 = true;
	}
	else if(e.keyCode == 65){
		leftPressed1 = true;
	}
}

function keyupHandler(e){
	if(e.keyCode == 39){
		rightPressed2 = false;
	}
	else if(e.keyCode == 37){
		leftPressed2 = false;
	}
	else if(e.keyCode == 68){
		rightPressed1 = false;
	}
	else if(e.keyCode == 65){
		leftPressed1 = false;
	}
}

function initializeGame(){
	drawScore();
	drawBall();
	drawPaddles();
}

function reloadPage(){
	document.location.reload();
}

document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);