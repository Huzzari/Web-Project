//canvas + context
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

//player variables
var playerHeight = 20;
var playerWidth = 20;
var playerX = 200;
var playerY = 300;
var playerColour = "#002295";
var playerGravity = 0.1;
var playerJump = -5;
var playerVelocity = 0;
var playerCenter = playerX+(playerWidth/2);

//platform variables
var platformColour = "#999999";
var platformHeight = 10;
var platformWidth = 75;
var platformAmount = 7;
var platformX = canvas.width/3;
var platformY = 320;
var platformVelocity = 4;
var platformArray = new Array(platformAmount);

//text variables
gameOverColour = "#CC2200";
scoreColour = "#222222";

//game mechanics variables
var onPlatform = true;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var noPause = true;
var score = 0;
//platform placement generation variables
var minJumpX = 50;
var minJumpY = canvas.height;
var maxJumpX = 200;
var maxJumpY = 100;


//code
//--------------------------------------------------------------------
function start(){
	initializePlatforms();
	setInterval(draw,10);
}

function draw(){

	if(noPause){
		context.clearRect(0,0,canvas.width,canvas.height);
		drawPlayer();
		movePlatforms();
		drawPlatform();
		collisionCheck();
		jump();
		gravity();
		checkBounds();
		drawScore()
		
		playerY += playerVelocity;
	}
}

function drawPlayer(){
	
	context.beginPath();
	context.rect(playerX, playerY, playerWidth, playerHeight);
	context.fillStyle = playerColour;
	context.fill();
	context.closePath();
	
}

function drawPlatform(){
	
	for(c=0; c<platformArray.length; c++){
		var tempPlat = platformArray[c]
		context.beginPath();
		context.rect(tempPlat.x, tempPlat.y, platformWidth, platformHeight);
		context.fillStyle = platformColour;
		context.fill();
		context.closePath();
	}
}

function drawScore(){
	context.font = ("20px Arial");
	context.fillStyle = scoreColour;
	context.fillText("Score: " + score, 10, 30);
}

function jump(){
	if(onPlatform && upPressed){
		playerVelocity = playerJump;
		onPlatform=false;
	}
}

function gravity(){
	if(!onPlatform){
		playerVelocity += playerGravity;
	}
}

//function to move platforms (player never moves left or right)
function movePlatforms(){
	if(rightPressed){//move platforms left
		for(c=0; c<platformArray.length; c++){
			movePlat = platformArray[c];
			movePlat.x -= platformVelocity;
		}
	}
	else if(leftPressed){//move platforms right
		for(c=0; c<platformArray.length; c++){
			movePlat = platformArray[c];
			movePlat.x += platformVelocity;
		}
	}
}

function collisionCheck(){
	//add check to see if player hits bottom of screen
	if(playerY>canvas.height){
		setPause();
		
		context.font= "32px Arial";
		context.fillStyle = gameOverColour;
		context.fillText("GAME OVER", 250, canvas.height/2);
	}
	else{
	//check if player hits a platform
		onPlatform=false;
		for(c=0; c<platformArray.length; c++){
			var platformCheck = platformArray[c];
			if(playerCenter>platformCheck.x && playerCenter< platformCheck.x+platformWidth){
				if(playerY >= platformCheck.y-playerHeight && playerY <= platformCheck.y-playerHeight+platformHeight){
					playerY = platformCheck.y - playerHeight;
					if(onPlatform==false){
						onPlatform=true;
						playerVelocity=0;
					}
				}
			}
		}
	}
}

//check to see if the leftmost platform is off the screen
function checkBounds(){
	var checkPlat = platformArray[0];
	if((checkPlat.x + platformWidth) < 0){
		//shuffle platforms over in array. This deletes the off screen platform.
		for(c=0; c<platformArray.length-1; c++){
			platformArray[c] = platformArray[c+1];
		}
		//create a new platform. random position within limits.
		var newX = platformArray[platformAmount-1].x;
		var newY = platformArray[platformAmount-1].y;
		
		newX += Math.floor(Math.random() * (maxJumpX-(minJumpX+platformWidth)+1)+(minJumpX+platformWidth));
		newY = Math.floor(Math.random() * ((canvas.height-100)-(newY-maxJumpY)+1)+(newY-maxJumpY));
		
		platformArray[platformAmount-1] = {x:newX, y:newY};
		
		score++;
		
	}
}

function setPause(){
	if(noPause==false){
		noPause=true;
	}
	else{
		noPause=false;
	}
}

function initializePlatforms(){//make first platforms
	
	var newY=0;
	var newX=0;
	platformArray[0] = {x:200, y:320};
	
	for(c=1; c<platformArray.length; c++){
		newX = platformArray[c-1].x;
		newY = platformArray[c-1].y;
		
		newX += Math.floor(Math.random() * (maxJumpX-(minJumpX+platformWidth)+1)+(minJumpX+platformWidth));
		newY = Math.floor(Math.random() * ((canvas.height-100)-(newY-maxJumpY)+1)+(newY-maxJumpY));
		
		platformArray[c] = {x:newX, y:newY};
	}

}

function reloadPage(){
	document.location.reload();
}

function keydownHandler(e){
	if(e.keyCode == 39){//right arrow
		rightPressed=true;
	}
	else if(e.keyCode == 37){//left arrow
		leftPressed = true;
	}
	else if(e.keyCode == 38){//up key
		upPressed = true;
	}
}

function keyupHandler(e){
	if(e.keyCode == 39){//right arrow
		rightPressed=false;
	}
	else if(e.keyCode == 37){//left arrow
		leftPressed = false;
	}
	else if(e.keyCode == 38){//up key
		upPressed = false;
	}
}

document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);
