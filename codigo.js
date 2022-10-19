
// Here we are going to write all the variable


const grid = document.querySelector('.grid');

const blockWidth = 100;

const blockHeight = 20;

const boardWidth = 1110;

const boardHeight = 400;

const playerStart = [560, 10];

let currentPosition =  playerStart;

const ballStart = [600, 40];

let ballCurrentPosition = ballStart;

let xDirection = -2;

let yDirection = 2;

let ballTimerId;

const ballDiameter = 20;

let results = 0;

const resultDisplay = document.querySelector('.result');

const scoreDisplay = document.querySelector('.score')

// We create the blocks

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const blocks = [
    new Block(10, 370), new Block(120, 370), new Block(230, 370), new Block(340, 370), new Block(450, 370),
    new Block(560, 370), new Block(670, 370), new Block(780, 370), new Block(890, 370), new Block(1000, 370),
    new Block(10, 340), new Block(120, 340), new Block(230, 340), new Block(340, 340), new Block(450, 340),
    new Block(560, 340), new Block(670, 340), new Block(780, 340), new Block(890, 340), new Block(1000, 340),
    new Block(10, 310), new Block(120, 310), new Block(230, 310), new Block(340, 310), new Block(450, 310),
    new Block(560, 310), new Block(670, 310), new Block(780, 310), new Block(890, 310), new Block(1000, 310),
    new Block(10, 280), new Block(120, 280), new Block(230, 280), new Block(340, 280), new Block(450, 280),
    new Block(560, 280), new Block(670, 280), new Block(780, 280), new Block(890, 280), new Block(1000, 280),
    new Block(10, 250), new Block(120, 250), new Block(230, 250), new Block(340, 250), new Block(450, 250),
    new Block(560, 250), new Block(670, 250), new Block(780, 250), new Block(890, 250), new Block(1000, 250),
    new Block(10, 220), new Block(120, 220), new Block(230, 220), new Block(340, 220), new Block(450, 220),
    new Block(560, 220), new Block(670, 220), new Block(780, 220), new Block(890, 220), new Block(1000, 220),
    new Block(10, 190), new Block(120, 190), new Block(230, 190), new Block(340, 190), new Block(450, 190),
    new Block(560, 190), new Block(670, 190), new Block(780, 190), new Block(890, 190), new Block(1000, 190)
    
]


// Draw the blocks

function addBlock() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

addBlock(); 

// add player

const player = document.createElement('div');
player.classList.add('player');
drawPlayer () 
grid.appendChild(player);

// draw player

function drawPlayer () {
    player.style.left = currentPosition[0] + 'px';
    player.style.bottom = currentPosition[1] + 'px';
}


//  move player 

function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if(currentPosition[0] > 0) {
                currentPosition[0] -= 20;
                drawPlayer ()
            } break;
        case 'ArrowRight':
            if(currentPosition[0] < (boardWidth - blockWidth - 10)) {
                currentPosition[0] += 20;
                drawPlayer ()
            } break;
    }
}

document.addEventListener('keydown', moveUser);

// add ball 

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall ()
grid.appendChild(ball);


// draw ball 

function drawBall () {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}


// move ball 

function moveBall () {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions ();
}

ballTimerId = setInterval(moveBall, 1);


// check for collisions 

function checkForCollisions () {

    //check for block collisions

    for (let i = 0; i < blocks.length; i++) {
        
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && 
            ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && 
            ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = [...document.querySelectorAll('.block')]
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1);
            changeDirection();
            results += 30;
            scoreDisplay.innerHTML = ' ' + results + ' points';
        }
    }

    // check for wall collisions 
    if (
        (ballCurrentPosition[0] >= boardWidth - ballDiameter) ||
        (ballCurrentPosition[1] >= boardHeight - ballDiameter) ||
        (ballCurrentPosition[0] <= 0)
        ) {
            changeDirection();
        }

    // check for player collisions

    if (
        (ballCurrentPosition[0] > currentPosition[0] &&
        ballCurrentPosition[0] < (currentPosition[0] + blockWidth)) &&
        (ballCurrentPosition[1] > currentPosition[1] && 
        ballCurrentPosition[1] < (currentPosition[1] + blockHeight))
        ) {
            changeDirection();
        }
    
    // check for game over

    if (ballCurrentPosition[1] <= 0) {
        clearInterval(ballTimerId);
        document.removeEventListener('keydown', moveUser);
        resultDisplay.innerHTML = 'Sorry :( , you lose! Please try again! ' + 'Your final score was ' + results + ' points'

    }

    // check for win 

    if (blocks.length === 0) {
        clearInterval(ballTimerId);
        document.removeEventListener('keydown', moveUser);
        resultDisplay.innerHTML = 'You have win :D ! ' + 'Your final score was ' + results + ' points,' + ' thanks for playing'
    }
}

function  changeDirection() {

    if (xDirection === 2 && yDirection === 2) {
        xDirection = -2;
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        yDirection = -2;
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        xDirection = 2;
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        yDirection = 2;
        return
    }
  
}