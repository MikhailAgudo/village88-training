let FIELD_WIDTH = 10;
let FIELD_HEIGHT = 20;
let BLOCK_WIDTH = 16;
let BLOCK_HEIGHT = 16;

let field = [];

let ticks = 1;

let blocks = [];

let screen = document.getElementById('screen');

let loss = false;

let activeBlocks = [];

function start () {
    initialize();
    setInterval(loop, 33);
}

function initialize () {
    initializeScreen();
    generateBlock();
}

function testBlock () {
    field[0][0] = 4;
    activeBlocks.push([0, 0]);

    field[0][1] = 4;
    activeBlocks.push([1, 0]);

    field[1][0] = 4;
    activeBlocks.push([0, 1]);

    field[1][1] = 4;
    activeBlocks.push([1, 1]);
}

function initializeScreen () {
    for ( let i = 0; i < FIELD_HEIGHT; i++ ) {
        let newRow = [];

        for ( let j = 0; j < FIELD_WIDTH; j++ ) {
            newRow.push(0);
        }

        field.push(newRow);
    }
}

function loop () {
    update();
    display();
}

function update () {
    if ( loss === false ) {
        ticks++;
    
        if ( checkActiveCollision(0, 1) === true ) {
            changeActive();
            checkScore();
            checkLoss();
        }
    
        if ( ticks % 30 === 0 ) {
            console.log('new');
            moveActive(0, 1);
        }
    }
}

function changeActive () {
    // Change the active block. Then also calculate any scores.
    activeBlocks = [];
    generateBlock();
}

function generateBlock () {
    addBlock(4, 0, 0);
    addBlock(4, 1, 0);
    addBlock(4, 2, 0);
    addBlock(4, 0, 1);
}

function checkScore () {
    for ( let i = FIELD_HEIGHT - 1; i >= 0; i-- ) {
        let sum = 0;

        for ( let j = 0; j < blocks.length; j++ ) {
            if ( blocks[j].y === i ) {
                console.log('score?');
                sum++;
            }
        }

        if ( sum === 10 ) {
            moveAll(i);
            i++;
        }
    }
}

function moveAll (y) {
    for ( let i = 0; i < blocks.length; i++ ) {
        if ( blocks[i].y === y ) {
            removeBlock(i);
            i--;
        }
    }

    for ( let i = 0; i < blocks.length; i++ ) {
        if ( blocks[i].y < y ) {
            moveBlock(blocks[i], 0, 1, false, true);
        }
    }
}

function checkLoss (block) {
    for ( let i = 0; i < blocks.length; i++ ) {
        if ( checkActive(blocks[i]) === false && blocks[i].y === 0 ) {
            loss = true;
            console.log('You lose');
        }
    }
}

function addBlock (value, x, y) {
    let blockDiv = document.createElement('div');

    let blockClass = determineBlock(value);

    addClasses(blockDiv, [
        'entity',
        'block',
        blockClass
    ]);

    let newBlock = {
        div: blockDiv,
        x: x,
        y: y
    };

    blocks.push(newBlock);
    activeBlocks.push(newBlock);
}

function removeBlock (index) {
    blocks[index].div.remove();
    blocks.splice(index, 1);
}

function moveActive (x, y) {
    let collision = checkActiveCollision(x, y);

    if ( collision === false ) {
        iterateActiveMove(x, y);
    }
}

function checkActiveCollision (x, y) {
    for ( let i = 0; i < activeBlocks.length; i++ ) {
        if ( checkMoveEnd(activeBlocks[i], y) === true ||
            checkMoveEdge(activeBlocks[i], x) === true ) {
            return true;
        }
    }

    return false;
}

function iterateActiveMove (x, y) {
    for ( let i = 0; i < activeBlocks.length; i++ ) {
        moveBlock(activeBlocks[i], x, y, true, false);
    }
}

function moveBlock (block, x, y, isActive, isScored) {
    if ( checkMoveEnd(block, y) === false && isScored === false ) {
        if ( isActive === true ) {
            if ( checkMoveEdge(block, x) === false ) {
                block.x += x;
            }

            block.y += y;
        } else {
            block.x += x;
            block.y += y;
        }
    } else {
        block.x += x;
        block.y += y;
    }
}

function checkMoveEnd (block, y) {
    if ( block.y + y > FIELD_HEIGHT - 1 || checkCollision(block, 0, y) === true ) {
        return true;
    } else {
        return false;
    }
}

function checkMoveEdge (block, x) {
    if ( block.x + x > FIELD_WIDTH - 1 || block.x + x < 0 || checkCollision(block, x, 0) === true ) {
        return true;
    } else {
        return false;
    }
}

function checkCollision (block, x, y) {
    for ( let i = 0; i < blocks.length; i++ ) {
        if ( block !== blocks[i] && checkActive(blocks[i]) === false ) {
            if ( block.x + x === blocks[i].x && 
                block.y + y === blocks[i].y) {
                console.log('collide');
                return true;
            }
        }
    }

    return false;
}

function checkActive (block) {
    for ( let i = 0; i < activeBlocks.length; i++ ) {
        if ( block === activeBlocks[i] ) {
            return true
        }
    }

    return false;
}

function rotate () {
    let XAnchor = getXAnchor();
    let YAnchor = getYAnchor();
    if ( checkRotation(XAnchor, YAnchor) === false ) {
        for ( let i = 0; i < activeBlocks.length; i++ ) {
            rotateBlock(activeBlocks[i], XAnchor, YAnchor);
        }
    }
}

function rotateBlock (block, x, y) {
    let oldX = block.x;
    let oldY = block.y;
    block.x = xRotate(oldY, x, y);
    block.y = yRotate(oldX, x, y);
    console.log(oldX + ',' + oldY + ' vs. ' + block.x + ',' + block.y);
}

function checkRotation (x, y) {
    for ( let i = 0; i < activeBlocks.length; i++ ) {
        let xRotation = xRotate(activeBlocks[i].y, x, y);
        if ( xRotation < 0 || xRotation > FIELD_WIDTH - 1 ) {
            return true;
        }

        let yRotation = yRotate(activeBlocks[i].x, x, y);
        if ( yRotation < 0 || yRotation > FIELD_HEIGHT - 1 ) {
            return true;
        }
    }

    return false;
}

function getXAnchor () {
    let min = activeBlocks[0].x;
    for ( let i = 0; i < activeBlocks.length; i++ ) {
        if ( activeBlocks[i].x < min ) {
            min = activeBlocks[i].x;
        }
    }
    console.log(min);
    return min;
}

function getYAnchor () {
    let min = activeBlocks[0].y;
    for ( let i = 0; i < activeBlocks.length; i++ ) {
        if ( activeBlocks[i].y < min ) {
            min = activeBlocks[i].y;
        }
    }
    return min;
}

function display () {
    // Count how many types of blocks there are
    // Then add or remove that much depending on if it changes
    // Then display them as they are
    // This is faster than destroying the entire $innerHTML then rebuilding it from scratch
    screen.innerHTML = '';

    for ( let i = 0; i < blocks.length; i++ ) {
        drawBlock(blocks[i]);
    }

    /*
    for ( let y = 0; y < field.length; y++ ) {
        for ( let x = 0; x < field[y].length; x++ ) {
            //let newBlock = makeBlock(field[y][x]);

            //adjustPosition(newBlock, x, y);

            //screen.appendChild(newBlock);
        }
    }
    */
}

function drawBlock (block) {
    block.div.style.top = px(block.y * BLOCK_HEIGHT);
    block.div.style.left = px(block.x * BLOCK_WIDTH);
    screen.appendChild(block.div);
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

function addClasses (element, classes) {
    element.classList.add(classes.shift());

    if ( classes.length > 0 ) {
        addClasses(element, classes);
    }
}

function px (value) {
    return value + 'px';
}

function xRotate (oldY, x, y) {
    return oldY + x - y;
}

function yRotate (oldX, x, y) {
    return x + y - oldX;
}

document.onkeydown = (e) => {
    switch ( e.keyCode ) {
        case 37:
            moveActive(-1, 0);
            break;
        case 38:
            rotate();
            break;
        case 39:
            moveActive(1, 0);
            break;
        case 40:
            moveActive(0, 1);
    }
}

start();