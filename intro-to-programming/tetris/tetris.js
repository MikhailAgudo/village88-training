let field = [];
let FIELD_WIDTH = 10;
let FIELD_HEIGHT = 20;

let screen = document.getElementById('screen');

function start () {
    initialize();
}

function initialize () {
    initializeScreen();
}

function initializeScreen () {
    for ( let i = 0; i < FIELD_HEIGHT; i++ ) {
        let newRow = [];

        for ( let j = 0; j < FIELD_WIDTH; i++ ) {
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
    
}

function display () {

}

function drawIBlock () {

}