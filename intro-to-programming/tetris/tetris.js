let FIELD_WIDTH = 10;
let FIELD_HEIGHT = 20;
let BLOCK_WIDTH = 16;
let BLOCK_HEIGHT = 16;

let field = [];

let ticks = 1;

let blocks = [];

let screen = document.getElementById('screen');

let activeBlocks = [];

function start () {
    initialize();
    setInterval(loop, 33);
}

function initialize () {
    initializeScreen();
    testBlock2();
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

function testBlock2 () {
    addBlock(4, 0, 0);
    addBlock(4, 1, 0);
    addBlock(4, 0, 1);
    addBlock(4, 1, 1);
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
    ticks++;

    if ( ticks % 30 === 0 ) {
        console.log('new');
        for ( let i = 0; i < activeBlocks.length; i++ ) {
            moveBlock(activeBlocks[i], 0, 1);
            //console.log('x' + activeBlock[i][0] + 'y' + activeBlock[i][1]);
            //moveBlock(activeBlock[i][0], activeBlock[i][1], 0, 1);

            //updateActiveBlock(i, 0, 1);
        }
    }
}

function changeActive () {
    // Change the active block. Then also calculate any scores.
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

function moveBlock (block, x, y, isActive) {
    if ( checkMoveEnd(block, y) === false ) {
        if ( isActive === true ) {
            if ( checkMoveEdge(block, x) === false ) {
                block.x += x;
            }

            block.y += y;
        } else {
            block.x += x;
            block.y += y;
        }
    }
}

function checkMoveEnd (block, y) {
    if ( block.y + y > FIELD_HEIGHT ) {
        return true;
    } else {
        return false;
    }
}

function checkMoveEdge (block, x) {
    if ( block.x + x > FIELD_WIDTH || block.x + x < 0 ) {
        return true;
    } else {
        return false;
    }
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

document.onkeydown = (e) => {
    switch ( e.keyCode ) {
        case 37:
            break;
    }
}

start();