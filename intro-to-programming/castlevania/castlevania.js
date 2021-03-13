/*--------------------------------------------------------------------------------*/
// ENGINE

let WIDTH = 800;
let HEIGHT = 240;
let screen = document.getElementById('screen');
let ticks = 0;
let entities = [];
let content = Content();
let alucard = Entity (5, 5, 48, 22, 5, 30, 'alucard', ['entity', 'alucard'], [
    content.playerRunningAnimation(),
    content.playerJumpingAnimation()
]);
alucard.initialize();

function start () {
    shmupControls();
    addEntity(alucard);
    setInterval(loop, 40);
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
    if ( entity.checkBottom() === false ) {
        entity.accelerate(0, 2, true);
    }
}

function display (i) {
    if ( i < entities.length ) {
        entities[i].animate();
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
                alucard.switchAnimation(1);
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
            switchAnimation(0);
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

    function animate () {
        if ( ACTIONS.length > 0 ) {
            if ( action.frame < action.frames.length ) {
                if ( action.checkDelay() === true ) {
                    div.style.backgroundPositionX = bgPos(action.frames[action.frame].x);
                    div.style.backgroundPositionY = bgPos(action.frames[action.frame].y);
                    div.style.width = px(action.frames[action.frame].width);
                    div.style.height = px(action.frames[action.frame].height);
    
                    action.frame++;
                }

                action.count++;
            } else {
                action.frame = 0;
                action.count = 0;

                if ( action !== ACTIONS[0] ) {
                    switchAnimation(0);
                }
            }
        }
    }

    function switchAnimation (index) {
        action.frame = 0;
        action.count = 0;
        action = ACTIONS[index];
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

    function checkBottom () {
        if ( position.y + size.height + 1 > HEIGHT ) {
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
        damage,
        animate,
        switchAnimation,
        checkDeath,
        checkBottom,
        getDiv,
        getMomentum,
        getPosition,
        getSize,
        getHP,
        getACTIONS,
        getAction
    };
}

function Action (animClass, frames, delay) {
    let frame = 0;
    let tick = 0;

    function checkDelay () {
        console.log(frame);
        if ( tick % delay === 0 ) {
            return true;
        }

        return false;
    }

    return {
        animClass,
        frame,
        count: tick,
        frames,
        checkDelay
    }
}

function Frame (x, y, width, height) {
    return {
        x,
        y,
        width,
        height
    }
}

/*--------------------------------------------------------------------------------*/
// CONTENT

function Content () {
    function playerRunningAnimation () {
        let frames = [];

        frames.push(Frame(14, 151, 32, 46));
        frames.push(Frame(59, 152, 30, 45));
        frames.push(Frame(103, 149, 29, 48));
        frames.push(Frame(144, 153, 29, 44));
        frames.push(Frame(192, 155, 29, 42));
        frames.push(Frame(240, 156, 28, 41));
        frames.push(Frame(286, 156, 27, 41));
        frames.push(Frame(332, 153, 26, 44));
        frames.push(Frame(373, 152, 27, 45));
        frames.push(Frame(414, 152, 34, 45));
        frames.push(Frame(462, 152, 39, 45));
        frames.push(Frame(517, 154, 37, 44));
        frames.push(Frame(569, 155, 39, 43));
        frames.push(Frame(620, 154, 37, 43));
        frames.push(Frame(673, 156, 39, 42));
        frames.push(Frame(728, 154, 34, 44));

        let newAnimation = Action('alucard', frames, 1);

        return newAnimation;
    }

    function playerJumpingAnimation () {
        let frames = [];

        frames.push(Frame(712, 484, 18, 49));
        frames.push(Frame(740, 484, 18, 49));
        frames.push(Frame(768, 484, 17, 49));
        frames.push(Frame(792, 484, 33, 41));
        frames.push(Frame(835, 484, 30, 47));
        frames.push(Frame(875, 485, 43, 38));

        let newAnimation = Action('alucard', frames, 100);

        return newAnimation;
    }

    return {
        playerRunningAnimation,
        playerJumpingAnimation
    }
}

/*--------------------------------------------------------------------------------*/
// HELPER FUNCTIONS

function px (value) {
    return value + 'px';
}

function bgPos (value) {
    return '-' + value + 'px';
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