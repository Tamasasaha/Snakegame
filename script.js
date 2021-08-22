
// all the variable and constants 
let inputDir ={ x:0 , y:0};

const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound  = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed =5;
let score= 0;
let lastPaintTime = 0;
let snakeArr =[{ x:13, y:15}];

let food ={x:6,y:7};

// all the funtions 
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);

    if((ctime -lastPaintTime)/1000 < (1/speed)){
        return;

    }
    lastPaintTime= ctime;
    gameEngine();

}

function isCollide(snake) {
    //if the snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x  && snakeArr[i].y === snakeArr[0].y  ){
            return true;
        }

    }

    // if the snake bump into the wall
    if(snakeArr[0].x>=18 ||snakeArr[0].x<=0 ||snakeArr[0].y<=0 ||snakeArr[0].y>=18){
        return true;
    }
}


function gameEngine(){

    //part 1:  Updating the snake array
    if(isCollide(snakeArr)){

        gameOverSound.play();
        musicSound.pause();
        inputDir ={ x:0 , y:0};
        alert("Game Over!Pres any key to play again!");
        snakeArr =[{ x:13, y:15}];
        musicSound.play();
        score = 0;
    }

    //if the snake eat the food then increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore" , JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }

        scoreBox.innerHTML= "Score: " + score;
        snakeArr.unshift( {x: snakeArr[0].x+inputDir.x , y:snakeArr[0].y+inputDir.y });
        let a =2;
        let b=16;        
        food = {x: Math.round(a+ (b-a)*Math.random()),  y: Math.round(a+(b-a)*Math.random())};
    } 

   //for moving the snake
    for (let i=snakeArr.length -2;i>=0;i--) {
        
        snakeArr[i+1]= {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    //part 2: Display the snake and food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;  //as for the rows we have to count from origin t y axis
        snakeElement.style.gridColumnStart= e.x; //as for the rows we have to count from origin t y axis
        
        if(index === 0){
            snakeElement.classList.add('head')

        }
        else{
            snakeElement.classList.add('snake')
        }

        board.appendChild(snakeElement);
    })

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;  //as for the rows we have to count from origin t y axis
    foodElement.style.gridColumnStart= food.x; //as for the rows we have to count from origin t y axis
    foodElement.classList.add('food')
    board.appendChild(foodElement);

    
}









// all the logic for the game
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval =0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))

}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir={ x:0, y:1};
    moveSound.play();
    switch (e.key) 
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;          
            break;

        case "ArrowDown":
            console.log("ArrowDown"); 
            inputDir.x=0;
            inputDir.y=1;           
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");   
            inputDir.x=-1;
            inputDir.y=-0;         
            break;

        case "ArrowRight":
            console.log("ArrowRight"); 
            inputDir.x=1;
            inputDir.y=0;           
            break;
    
        default:
            break;
    }

});
