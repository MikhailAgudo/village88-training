/*--------------------------------------------------------------------------------*/
// ENGINE

let WIDTH = 800;
let HEIGHT = 240;
let maxSpeed = 10;
let minSpeed = 2;
let overallSpeed = 5;
let castlePosition = 0;
let screen = document.getElementById('screen');
let ticks = 0;
let entities = [];
let content = Content();
let ai = AI();
let alucard = content.player();

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

        if ( entities[i].checkPlayer() === true ) {
            if ( checkCollision(entities[i]) === true ) {
                adjustSpeed(-1);
            }
        } else if (checkCollision(entities[i]) === true ) {
            entities[i].damage(1);
        }

        if ( entities[i].checkOutOfBounds() === true ) {
            entities[i].damage(1);
        }

        if ( entities[i].checkDeath() === true ) {
            removeEntity(i);
            i--;
        }

        ai.determine(entities[i]);
    }
    ai.spawn();

    ticks++;
}

function checkCollision (entity) {
    for ( let i = 0; i < entities.length; i++ ) {
        if ( entity !== entities[i] ) {
            let currentEntityPosX = entity.getPosition().x;
            let currentEntityPosY = entity.getPosition().y;
            let currentEntityWidth = entity.getSize().width;
            let currentEntityHeight = entity.getSize().height;

            let targetEntityPosX = entities[i].getPosition().x;
            let targetEntityPosY = entities[i].getPosition().y;
            let targetEntityWidth = entities[i].getSize().width;
            let targetEntityHeight = entities[i].getSize().height;

            if ( currentEntityPosX < targetEntityPosX + targetEntityWidth && 
                currentEntityPosX + currentEntityWidth > targetEntityPosX && 
                currentEntityPosY < targetEntityPosY + targetEntityHeight && 
                currentEntityPosY + currentEntityHeight > targetEntityPosY ) {
                console.log('Collide');
                return true;
            }
        }
    }

    return false;
}

function adjustSpeed (value) {
    overallSpeed += value;

    if ( overallSpeed > maxSpeed ) {
        overallSpeed = maxSpeed;
    } else if ( overallSpeed < minSpeed ) {
        overallSpeed = minSpeed;
    }
}

function addEntity (entity) {
    entities.push(entity);
    screen.appendChild(entity.getDiv());
}

function removeEntity (i) {
    entities[i].die();
    entities.splice(i, 1);
}

function applyGravity (entity) {
    if ( entity.checkBottom() === false ) {
        if ( entity.checkPlayer() === true && entity.checkOngoingAnimation() === false ) {
            entity.switchAnimation(2);
        }
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
    scrollBackground();
}

function draw (entity) {
    entity.getDiv().style.top = px(entity.getPosition().y + 1);
    entity.getDiv().style.left = px(entity.getPosition().x + 1);
}

function scrollBackground () {
    castlePosition -= overallSpeed;
    screen.style.backgroundPositionX = px(castlePosition);
}

/*--------------------------------------------------------------------------------*/
// CONTROLS

function shmupControls () {
    document.onkeydown = function(e) {
        switch ( e.keyCode ) {
            case 37:
                //alucard.accelerate(-4, 0, true);
                break;
            case 38:
                if ( alucard.checkBottom() ) {
                    alucard.accelerate(0, -25, false);
                    alucard.switchAnimation(1);
                }
                break;
            case 39:
                //alucard.accelerate(1, 0, true);
                break;
            case 40:
                //alucard.accelerate(0, 4, true);
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
        }

        rest();
    }

    function moveOverride (x, y) {
        position.x += x;
        position.y += y;
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

    function die () {
        div.remove();
    }

    function animate () {
        if ( ACTIONS.length > 0 ) {
            if ( checkOngoingAnimation() === true ) {
                if ( action.tick % action.delay === 0 ) {
                    div.style.backgroundPositionX = bgPos(action.frames[action.frame].x);
                    div.style.backgroundPositionY = bgPos(action.frames[action.frame].y);
                    div.style.width = px(action.frames[action.frame].width);
                    div.style.height = px(action.frames[action.frame].height);
    
                    action.frame++;
                }

                action.tick++;
            } else {
                action.frame = 0;
                action.tick = 0;

                if ( action !== ACTIONS[0] ) {
                    switchAnimation(0);
                }
            }
        }
    }

    function switchAnimation (index) {
        action.frame = 0;
        action.tick = 0;
        action = ACTIONS[index];
    }

    function checkOngoingAnimation () {
        if ( action.frame < action.frames.length ) {
            return true;
        }

        return false;
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

    function checkPlayer () {
        if ( name === 'alucard' ) {
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
        moveOverride,
        accelerate,
        damage,
        die,
        animate,
        switchAnimation,
        checkOngoingAnimation,
        checkOutOfBounds,
        checkDeath,
        checkBottom,
        checkPlayer,
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

    return {
        animClass,
        frame,
        tick,
        frames,
        delay
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
    function player () {
        let alucard = Entity (60, HEIGHT - 48, 48, 22, 5, 30, 'alucard', ['entity', 'alucard'], [
            playerRunningAnimation(),
            playerJumpingAnimation(),
            playerFallingAnimation()
        ]);

        alucard.initialize();

        return alucard;
    }

    function zombie (x, y) {
        let zombie = Entity (x, y, 30, 45, 1, 0, 'zombie', ['entity', 'zombie'], [
            zombieRunningAnimation()
        ]);

        zombie.initialize();

        return zombie;
    }

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

        let newAnimation = Action('alucard', frames, 2);

        return newAnimation;
    }

    function playerFallingAnimation () {
        let frames = []

        frames.push(Frame(344, 566, 45, 50));
        frames.push(Frame(400, 559, 46, 57));
        frames.push(Frame(461, 555, 45, 62));
        frames.push(Frame(519, 569, 45, 48));
        frames.push(Frame(575, 571, 43, 46));
        frames.push(Frame(630, 572, 40, 45));
        frames.push(Frame(684, 572, 36, 44));

        let newAnimation = Action('alucard', frames, 2);

        return newAnimation;
    }

    function zombieRunningAnimation () {
        let frames = []

        frames.push(Frame(1, 2, 30, 45));
        frames.push(Frame(33, 2, 28, 45));
        frames.push(Frame(61, 9, 31, 39));
        frames.push(Frame(94, 15, 33, 32));
        frames.push(Frame(61, 9, 31, 39));
        frames.push(Frame(33, 2, 28, 45));

        let newAnimation = Action('zombie', frames, 1);

        return newAnimation;
    }

    return {
        player,
        zombie
    }
}

/*--------------------------------------------------------------------------------*/
// AI

function AI () {
    function determine (entity) {
        switch ( entity.name ) {
            case 'zombie':
                entity.moveOverride(-10 - overallSpeed, 0);
                break;
        }
    }

    function spawn () {
        if ( ticks % (100 - overallSpeed) === 0 ) {
            addEntity(content.zombie(750, HEIGHT - 45));
        }
    }

    return {
        determine,
        spawn
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