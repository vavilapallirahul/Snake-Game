// game constants and variables
let inputDir = {x:0 , y:0};
const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [{x: 13 , y: 15}];
let food = {x: 6 , y: 7};
let score = 0;
let mx_score = 0;

// game funstion
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }

 //   console.log(ctime);

    lastPaintTime = ctime;
    gameEngine();
    
}

function isCollide(snakeArr){
    // if you collide with yourself

    for(let i = 1; i < snakeArr.length; i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
        return true;
    }

     // collision with boundary
    if(snakeArr[0].x < 0 || snakeArr[0].x >= 18|| snakeArr[0].y < 0 || snakeArr[0].y >= 18)
    return true;

    return false;
}

function gameEngine(){
    //part 1: update the  snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0 , y: 0};
        alert("game over press any key to play again");
        snakeArr = [{x: 13 , y: 15}];
        score = 0;
        Score.innerHTML = "Score:" + score;
    }

    // if food eaten increament the score and regenarate the food
    musicSound.play();
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        score = score + 1;

        if(mx_score < score)
        mx_score = score;

        Score.innerHTML = "Score:" + score;
        Mx_score.innerHTML = "High_Score:" + mx_score;

        // after snake eats the food regenerate the food again here
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a)*Math.random()) , y: Math.round(a + (b - a)*Math.random())};
    }

        // move the snake after the snake eats the food i.e shild each segment to its preceeding segment
        for(let i = snakeArr.length - 2; i >= 0; i--){
            snakeArr[i + 1] = {...snakeArr[i]};
        }

        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
    
    // part 2 : display the snake
    board.innerHTML = "";
    snakeArr.forEach((e , index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snakeElement.classList.add("head");
        }
        else
        snakeElement.classList.add("snake");

        board.appendChild(snakeElement);
    });

     // display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}





// main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown' , e =>{
    intputDir = {x: 0 , y: 1}; // start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

       default:
           break;
    }
});