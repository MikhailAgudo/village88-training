/*--------------------------------------------------------------------------------*/
// ENGINE

let screen = document.getElementById('screen');
let ticks = 0;
let entities = [];

function start () {
    shmupControls();
    setInterval(loop, 33);
}

function loop () {
    update();
    display(0);
}

function update () {
    for ( let i = 0; i < entities.length; i++ ) {

    }

    ticks++;
}

function display (i) {
    if ( i < entities.length ) {
        draw(entities[i]);
    
        i++;

        display(i);
    }
}

function draw (entity) {
    entity.getDiv().style.top = px(entity.getPosition().y);
    entity.getDiv().style.left = px(entity.getPosition().x);
}

/*--------------------------------------------------------------------------------*/
// CONTROLS

function shmupControls () {
    document.onkeydown = function(e) {
        switch ( e.keyCode ) {
            case 39:
                console.log('left');
                break;
        }
    }
}

/*--------------------------------------------------------------------------------*/
// ENTITY

function Entity (x, y, height, width, hits, speed, name, classes, actions) {
    let div = document.createElement('div');

    addClasses(div, classes);

    let ACTIONS = actions;

    let momentum = {
        x: 0,
        y: 0
    };

    let position = {
        x: x,
        y: y
    };

    let size = {
        width: width,
        height: height
    };

    let HP = {
        current: 0,
        full: hits
    };
    
    function move () {
        position.x += momentum.x;
        position.y += momentum.y;
    }

    function accelerate (x, y) {
        momentum.x += x;
        momentum.y += y;

        momentum.x = limit(momentum.x, speed);
        momentum.y = limit(momentum.y, speed);
    }

    function getDiv () {
        return div;
    }

    function getMomentum () {
        return momentum;
    }

    function getPosition () {
        return position;
    }

    function getSize () {
        return size;
    }

    function getHP () {
        return HP;
    }

    function getACTIONS () {
        return ACTIONS;
    }

    return {
        speed,
        name,
        move,
        accelerate,
        getDiv,
        getMomentum,
        getPosition,
        getSize,
        getHP,
        getACTIONS
    };
}

/*--------------------------------------------------------------------------------*/
// HELPER FUNCTIONS

function px (value) {
    return value + 'px';
}

function abs (value) {
    if ( value < 0 ) {
        return -value;
    }

    return value;
}

function limit (value, limit) {
    if ( abs(value) > limit ) {
        if ( value < 0 ) {
            value = -limit;
            return value;
        } else if ( value > 0 ) {
            value = limit;
            return value;
        }
    }

    return value;
}

function RNG (min, max) {
    return Math.floor(Math.random() * (max - 1)) + min;
}

function addClasses (element, classes) {
    element.classList.add(classes.shift());

    if ( classes.length > 0 ) {
        addClasses(element, classes);
    }
}

start();