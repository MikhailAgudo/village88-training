let FIELD_WIDTH = 10;
let FIELD_HEIGHT = 20;
let BLOCK_WIDTH = 16;
let BLOCK_HEIGHT = 16;

let field = [];

let ticks = 1;

let blockDivs = [];

let screen = document.getElementById('screen');

let activeBlock = [];

function start () {
    initialize();
    setInterval(loop, 33);
}

function initialize () {
    initializeScreen();
}

function initializeScreen () {
    for ( let i = 0; i < FIELD_HEIGHT; i++ ) {
        let newRow = [];

        for ( let j = 0; j < FIELD_WIDTH; j++ ) {
            newRow.push(1);
        }

        field.push(newRow);
    }
}

function loop () {
    update();
    display();
}

function update () {
    ticks++;
}

function moveBlock (x, y, moveX, moveY) {
    let temp = field[y][x];
    field[y][x] = field[y + moveY][x + moveX];
    field[y + moveY][x + moveX] = temp;
}

function checkMoveConflict () {

}

function display () {
    // Count how many types of blocks there are
    // Then add or remove that much depending on if it changes
    // Then display them as they are
    // This is faster than destroying the entire $innerHTML then rebuilding it from scratch
    screen.innerHTML = '';

    for ( let y = 0; y < field.length; y++ ) {
        for ( let x = 0; x < field[y].length; x++ ) {
            let newBlock = drawBlock(field[y][x]);

            adjustPosition(newBlock, x, y);

            screen.appendChild(newBlock);
        }
    }
}

function drawBlock (value) {
    let newBlock = document.createElement('div');

    let blockClass = determineBlock(value);

    addClasses(newBlock, [
        'entity',
        'block',
        blockClass
    ]);

    return newBlock;
}

function determineBlock (value) {
    switch ( value ) {
        case 1:
            return 'block-i';
        case 2:
            return 'block-j';
        case 3:
            return 'block-l';
        case 4:
            return 'block-o';
        case 5:
            return 'block-s';
        case 6:
            return 'block-t';
        case 7:
            return 'block-z';
    }
}

function adjustPosition (newBlock, x, y) {
    newBlock.style.top = px(y * BLOCK_HEIGHT);
    newBlock.style.left = px(x * BLOCK_WIDTH);
}

function addClasses (element, classes) {
    element.classList.add(classes.shift());

    if ( classes.length > 0 ) {
        addClasses(element, classes);
    }
}

function px (value) {
    return value + 'px';
}

document.onkeydown = (e) => {
    switch ( e.keyCode ) {
        case 37:
            break;
    }
}

start();