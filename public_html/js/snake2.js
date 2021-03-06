            /*------------------------------------------------------------------------------------------------------------------------------------
 * Variables
 * -----------------------------------------------------------------------------------------------------------------------------------------------
 */

var snake;
var snakeLength;
var snakeSize;  

var food;

var context;
var screenWidth ;
var screenHeight;
var checkFoodCollisions;
var checkWallCollisions;

var gameState;
var gameOverMenu;
/*-----------------------------------------------------------------------------------------------------------------------------
 * Executing Game Code
 * ----------------------------------------------------------------------------------------------------------------------------
 */

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval (gameLoop, 10);





function gameInitialize() {
    var canvas= document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    document.addEventListener("keydown", keyboardHandler);
}

  gameOverMenu = document.getElementById("gameOver");
    
    setState("PLAY");

function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw() {
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, screenWidth, screenHeight); 
}

/*-----------------------------------------------------------------------------------------------------------------------------
 * Snake Functions
 *-----------------------------------------------------------------------------------------------------------------------------
 */

function snakeInitialize() {
    snake = [];
    snakeLength = 3;
    snakeSize = 5;
    snakeDirection = "down";
    
    for(var index = snakeLength - 1; index >= 0; index--) {
       snake.push( {
           x: index,
           y: 0
       }); 
    }
}

function snakeDraw() {
    for(var index = 0; index < snake.length; index++) {
        context.fillStyle = "purple";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;    
    
    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY)
    
    if(snakeDirection == "down")  {
        snakeHeadY++;
    }
    else  if(snakeDirection == "right") {
        snakeHeadX++;
    }
    
    else  if(snakeDirection == "up") {
        snakeHeadY--;
    }
    
    else if(snakeDirection == "left") {
        snakeHeadX--;
    }
    
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

/*-----------------------------------------------------------------------------------------------------------------------------
 * Food Functions
 * ----------------------------------------------------------------------------------------------------------------------------
 */

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "orange";
    context.fillRect(food.x *snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition(){
    var randomX =Math.floor(Math.random() * screenWidth);
    var randomY =Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor (randomX / snakeSize);
    food.y = Math.floor (randomY / snakeSize);
}

function keyboardHandler(event) {
    console.log(event);
    
    if(event.keyCode == "39" && snakeDirection != "left") {
        snakeDirection = "right"; 
    }
    
    else if(event.keyCode == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    }
    
    else if(event.keyCode == "38" && snakeDirection != "down"){
        snakeDirection = "up";
    }
    
    else if(event.keyCode == "37" && snakeDirection != "right"){
        snakeDirection = "left";
    }
}

/*------------------------------------------------------------------------------------------------------------------------------
 * Collision Handling
 * -----------------------------------------------------------------------------------------------------------------------------
 */

function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX == food.x && snakeHeadY == food.y) {
        console.log("Food Collision");
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++;
        
        var randomX =Math.floor(Math.random() * screenWidth);
    var randomY =Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor (randomX / snakeSize);
    food.y = Math.floor (randomY / snakeSize);
    }
}

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        console.log("Wall Collision");
         setSnake("GAME OVER");
    }
}

/*------------------------------------------------------------------------------------------------------------------------------
 *  Game State Handling
 *  ----------------------------------------------------------------------------------------------------------------------------
 */

function setState(state) {
    gameState = state;
     showMenu(state);
}

function displayMenu(menu) {
 menu.style.visibility = "visible";   
}

function showMenu(state) {
    if(state == "GAME OVER") {
        displayMenu(gameOverMenu);
    }
}

/*
 * an extreme level
 * 
 */