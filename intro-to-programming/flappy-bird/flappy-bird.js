let width = 600;
let height = 800;
let ticks = 0;
let death = false;
let score = document.getElementById('score');
let bird = document.getElementById('bird');
let birdSize = {
    width: 50,
    height: 50
}
let birdPosition = {
    x: 0,
    y: 0
}
let birdMomentum = {
    x: 0,
    y: 0
}

let topPipe = document.getElementById('top-pipe');
let topPipeSize = {
    width: 125,
    height: 500
}
let topPipePosition = {
    x: width,
    y: 0
}

let bottomPipe = document.getElementById('bottom-pipe');
let bottomPipeSize = {
    width: 125,
    height: 500
}
let bottomPipePosition = {
    x: width,
    y: 0
}

function startGame () {
    generatePipes();
    setInterval(loop, 33);
}

function loop () {
    update();
    display();
}

function update () {
    ticks++;
    if ( birdPosition.y < height ) {
        moveBird();
    }
    movePipes();

    checkCollision();
    //autoFly();
}

function checkCollision () {
    if ( birdPosition.x < topPipePosition.x + topPipeSize.width &&
        birdPosition.x + birdSize.width > topPipePosition.x &&
        birdPosition.y < topPipePosition.y + topPipeSize.height &&
        birdPosition.y + birdSize.height > topPipePosition.y ) {
            bird.remove();
            death = true;
    } else if ( birdPosition.x < bottomPipePosition.x + bottomPipeSize.width &&
        birdPosition.x + birdSize.width > bottomPipePosition.x &&
        birdPosition.y < bottomPipePosition.y + bottomPipeSize.height &&
        birdPosition.y + birdSize.height > bottomPipePosition.y ) {
            bird.remove();
            death = true;
    }
}

function addScore () {
    let number = parseInt(score.textContent);
    number++;
    score.textContent = number;
}

function autoFly () {
    if ( ticks % 10 === 0 ) {
        flyBird();
    }
}

function flyBird () {
    birdMomentum.y += -21;
}

function moveBird () {
    birdPosition.x += birdMomentum.x;
    birdPosition.y += birdMomentum.y;

    restBird();
    birdGravity();
}

function movePipes () {
    topPipePosition.x += -8;
    bottomPipePosition.x += -8;

    if ( topPipePosition.x <= 0 ) {
        if ( death === false ) {
            addScore();
        }

        topPipePosition.x = width;
        bottomPipePosition.x = width;

        generatePipes();
    }
}

function generatePipes () {
    let number = ticks % 300;
    
    topPipePosition.y = -300 + number;
    bottomPipePosition.y = topPipePosition.y + topPipeSize.height + 150;
}

function restBird () {
    birdMomentum.x = parseInt(birdMomentum.x * 0.99);
    birdMomentum.y = parseInt(birdMomentum.y * 0.99);
}

function birdGravity () {
    if ( birdMomentum.y < 20 ) {
        birdMomentum.y += 2;
    }
}

function display () {
    draw(bird, birdPosition);
    draw(topPipe, topPipePosition);
    draw(bottomPipe, bottomPipePosition)
}

function draw (element, position) {
    element.style.top = px(position.y);
    element.style.left = px(position.x);
}

function px (value) {
    return value + 'px';
}

document.onkeydown = (e) => {
    switch ( e.keyCode ) {
        case 90:
            flyBird();
            break;
    }
}

startGame();