/*--------------------------------------------------------------------------------*/
// ENGINE

let WIDTH = 800;
let HEIGHT = 240;
let screen = document.getElementById('screen');
let ticks = 0;
let entities = [];
let alucard = Entity (5, 5, 48, 22, 5, 30, 'alucard', ['entity', 'alucard'], []);

function start () {
    shmupControls();
    addEntity(alucard);
    setInterval(loop, 33);
}

function loop () {
    update();
    display(0);
}

function update () {
    for ( let i = 0; i < entities.length; i++ ) {
        applyGravity(entities[i]);
        entities[i].move();
    }

    ticks++;
}

function addEntity (entity) {
    entities.push(entity);
    screen.appendChild(entity.getDiv());
}

function removeEntity (i) {
    entities[i].div.remove();
    entities.splice(i, 1);
}

function applyGravity (entity) {
    entity.accelerate(0, 2, true);
}

function display (i) {
    if ( i < entities.length ) {
        draw(entities[i]);
    
        i++;

        display(i);
    }
}

function draw (entity) {
    entity.getDiv().style.top = px(entity.getPosition().y + 1);
    entity.getDiv().style.left = px(entity.getPosition().x + 1);
}

/*--------------------------------------------------------------------------------*/
// CONTROLS

function shmupControls () {
    document.onkeydown = function(e) {
        switch ( e.keyCode ) {
            case 37:
                alucard.accelerate(-4, 0, true);
                break;
            case 38:
                alucard.accelerate(0, -25, false);
                break;
            case 39:
                alucard.accelerate(4, 0, true);
                break;
            case 40:
                alucard.accelerate(0, 4, true);
                break;
        }
    }
}

/*--------------------------------------------------------------------------------*/
// ENTITY

function Entity (x, y, height, width, hits, speed, name, classes, actions) {
    let div = document.createElement('div');

    let ACTIONS = actions;
    let action;

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

    function initialize () {
        addClasses(div, classes);

        if ( ACTIONS.length > 0 ) {
            action = ACTIONS[0];
        }
    }
    
    function move () {
        if ( checkOutOfBounds() === false ) {
            position.x += momentum.x;
            position.y += momentum.y;

            adjustOutOfBounds();
        } else {
            damage(1);
        }

        rest();
    }

    function accelerate (x, y, isLimited) {
        momentum.x += x;
        momentum.y += y;

        if ( isLimited === true ) {
            momentum.x = limit(momentum.x, speed);
            momentum.y = limit(momentum.y, speed);
        }
    }

    function rest () {
        console.log(momentum.y);
        momentum.x = parseInt(momentum.x * 0.99);
        momentum.y = parseInt(momentum.y * 0.99);
    }

    function adjustOutOfBounds () {
        if ( position.x + size.width > WIDTH ) {
            position.x = WIDTH - size.width;
        } else if ( position.x < 0 ) {
            position.x = 0;
        }

        if ( position.y + size.height > HEIGHT ) {
            position.y = HEIGHT - size.height;
            momentum.y = 0;
        } else if ( position.y < 0 ) {
            position.y = 0;
        }
    }

    function damage (value) {
        HP.current += value;

        if ( HP.current > HP.full ) {
            HP.current = HP.full;
        }
    }

    function checkOutOfBounds () {
        if ( position.x + size.width > WIDTH || position.x < 0 ) {
            return true;
        }

        if ( position.y + size.height > HEIGHT || position.y < 0 ) {
            return true;
        }

        return false;
    }

    function checkDeath () {
        if ( HP.current >= HP.full ) {
            return true;
        }

        return false;
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

    function getAction () {
        return action;
    }

    return {
        speed,
        name,
        initialize,
        move,
        accelerate,
        getDiv,
        getMomentum,
        getPosition,
        getSize,
        getHP,
        getACTIONS,
        getAction
    };
}

function Action () {
    
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