document.addEventListener("DOMContentLoaded", function () {

    const gameArena = document.getElementById("game-Arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0 ; 
    let gameStarted = false;
    let food = {x:300 , y :200}; //top left pixels for food
    let snake = [{x: 160, y: 200} , {x:140 , y : 200} , {x:120 , y : 200}];

    let dx = cellSize; //horizontal velocity of snake
    let dy = 0; 
    let intervalId; // to
    // store the interval ID for game loop
    let gameSpeed = 200; // speed of the game in milliseconds
    function moveFood() {
        let newX, newY;
        do {
            newX = Math.floor(Math.random() * 30) * cellSize;
            newY = Math.floor(Math.random() * 30) * cellSize;

        }while(snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY))           
        
        food = {x: newX , y : newY};

    }



    function updateSnake(){
        const snakeNewHead = {x: snake[0].x + dx , y: snake[0].y + dy};
        snake.unshift(snakeNewHead); // add new head to the beginning of the snake array

        if (snakeNewHead.x === food.x && snakeNewHead.y === food.y) {
            score+=10;
            moveFood(); //move food to a new random position

            if(gamespeed > 50) {
                clearInterval(intervalId); // stop the current game loop
                gameSpeed -= 10;
                gameLoop(); // start a new game loop with the updated speed
            }
        } else {
            snake.pop(); // remove the tail of the snake if it didn't eat food
        }
    }

        function changeDirection(event) {
            console.log("keypressd", event) ;
            const isGoingDown = dy === cellSize; 
            const isGoingUp = dy === -cellSize;
            const isGoingLeft = dx === -cellSize;
            const isGoingRight = dx === cellSize;      
            if(event.key === "ArrowUp" && !isGoingDown) {
                dx = 0;
                dy = -cellSize;
            }else if (event.key === "ArrowDown" && !isGoingUp) {
                dx = 0;
                dy = cellSize;
            }else if (event.key === "ArrowLeft" && !isGoingRight) {
                dx = -cellSize;
                dy = 0;
            }   else if (event.key === "ArrowRight" && !isGoingLeft) {
                dx = cellSize;
                dy = 0;
            } 
        }

    function drawDiv (x, y, className) {
        const divelement = document.createElement("div");
        divelement.classList.add(className)
                divelement.style.top = `${y}px`;
                divelement.style.left = `${x}px`;

        return divelement;

    }




    function drawFoodAndSnake() {
        gameArena.innerHTML = ""; // wipe out everything and  draw positions of snake and food
       
        snake.forEach((snakeCell) => {
        const snakeElement = drawDiv(snakeCell.x , snakeCell.y , 'snake');
        gameArena.appendChild(snakeElement);




       });
       
    
       
       
        const foodElement = drawDiv (food.x , food.y , 'food');
        gameArena.appendChild(foodElement);
    
    
    }

function isGameOver() {
        for(let i = 1; i < snake.length; i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                return true; // snake has collided with itself
            }
        }
        const hitLeftWall = snake[0].x <-1;
        const hitRightWall = snake[0].x >= arenaSize - 10;
        const hitTopWall = snake[0].y < -1;
        const hitBottomWall = snake[0].y >= arenaSize - 10;  
        

        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
    }





    function gameLoop() {
        intervalId = setInterval(() => {
            if(isGameOver()) {
                clearInterval(intervalId);
                
                gameStarted = false; // reset game state to allow restarting
                alert(`Game Over! Your final score is: ${score}`);
                return;
            }


            updateSnake();
            displayScore();
            drawFoodAndSnake();

            }, gameSpeed); // update snake position every 100 milliseconds
        
         // call gameLoop every 100 milliseconds
    }


    

    function runGame() {
        if (!gameStarted) {
            gameStarted = true;
            document.addEventListener("keydown", changeDirection);
            
            gameLoop(); 
                 
        
        }

    }

    function displayScore() {
        const scoreBoard = document.getElementById("score-board");
        scoreBoard.textContent = `Score: ${score}`;
    }

    function initiateGame() {   
       const scoreBoard= document.createElement("div");
       scoreBoard.id = 'score-board';

       document.body.insertBefore(scoreBoard , gameArena);


    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-button");
    startButton.addEventListener("click", function startGame() {
    startButton.style.display = "none";
    
    runGame();

    });

    document.body.appendChild(startButton);

    }
    
    initiateGame();

})