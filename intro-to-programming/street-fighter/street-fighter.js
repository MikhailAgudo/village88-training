// Ken will dodge bullets from machine guns and kill street people

const Entity = (x, y, width, height, hits, speed, name, classes, actions) => {
    const SPEED = speed;
    const SIZE = {
        width: width,
        height: height
    };
    const NAME = name;
    let ACTIONS = actions;
    let property = document.createElement('div');
    let HP = [0, hits];
    let position = {
        x: x,
        y: y
    };
    let momentum = {
        x: 0,
        y: 0
    }
    let action = ACTIONS[0];
    let frame = 0;

    const initialize = () => {
        property.classList.add('entity');

        property.style.width = SIZE.width + 'px';
        property.style.height = SIZE.height + 'px';

        addClasses();

        if ( ACTIONS.length > 0 ) {
            switchAction(0);
        }
    }

    const addClasses = () => {
        property.classList.add(classes.shift());

        if ( classes.length > 0 ) {
            addClasses();
        }
    }

    const move = () => {
        position.x += momentum.x;
        position.y += momentum.y;

        if ( checkOutOfBounds() === true ) {
            console.log('damage');
            damage(1);
        }
    }

    const accelerate = (x, y) => {
        momentum.x += x;
        momentum.y += y;

        momentum.x = Structurer.limit(momentum.x, SPEED);
        momentum.y = Structurer.limit(momentum.y, SPEED);
    }

    const rest = () => {
        momentum.x = parseInt(momentum.x * 0.97);
        momentum.y = parseInt(momentum.y * 0.99);
    }

    const damage = (value) => {
        HP[0] += value;
    }

    const heal = (value) => {
        HP[0] -= value;

        if ( HP[0] < 0 ) {
            HP[0] = 0;
        }
    }

    const die = () => {
        property.remove();
    }

    const animate = () => {
        if ( ACTIONS.length > 0 ) {
            property.style.backgroundPositionX = Structurer.bgPos(frame * action.nextFrame);
    
            if ( frame >= action.frames - 1 ) {
                frame = 0;
                switchAction(0);
            } else {
                frame++;
            }
        }
    }

    const switchAction = (index) => {
        action = ACTIONS[index];
        property.style.backgroundPositionX = Structurer.bgPos(action.x);
        property.style.backgroundPositionY = Structurer.bgPos(action.y);
        
        frame = 0;
    }

    const checkDeath = () => {
        if ( HP[0] >= HP[1] ) {
            return true;
        } else {
            return false;
        }
    }

    const checkPlayer = () => {
        if ( NAME === 'player' ) {
            return true;
        } else {
            return false;
        }
    }

    const checkOutOfBounds = () => {
        if ( checkPlayer() === true ) {
            if ( position.x + SIZE.width > Engine.WIDTH ) {
                position.x = Engine.WIDTH - SIZE.width;
            } else if ( position.x < 0 ) {
                position.x = 0;
            }

            if ( position.y + SIZE.height > Engine.HEIGHT ) {
                position.y = Engine.HEIGHT - SIZE.height;
            } else if ( position.y < 0 ) {
                position.y = 0;
            }
        } else {
            if ( position.x + SIZE.width > Engine.WIDTH ) {
                return true;
            } else if ( position.x < 0 ) {
                return true;
            }

            if ( position.y + SIZE.height > Engine.HEIGHT ) {
                return true;
            } else if ( position.y < 0 ) {
                return true;
            }

            return false;
        }
    }

    const checkJump = () => {
        if ( (position.y + SIZE.height) > (Engine.HEIGHT - 10) ) {
            return true;
        } else {
            return false;
        }
    }

    const checkRestingAction = () => {
        if ( action === ACTIONS[0] ) {
            return true;
        } else {
            return false;
        }
    }

    const getProperty = () => {
        return property;
    }

    const getPosition = () => {
        return position;
    }

    const getHP = () => {
        return HP;
    }

    const getActions = () => {
        return ACTIONS;
    }

    const getAction = () => {
        return action;
    }

    const getFrame = () => {
        return frame;
    }

    return {
        initialize,
        move,
        accelerate,
        rest,
        damage,
        heal,
        die,
        animate,
        switchAction,
        checkDeath,
        checkPlayer,
        checkJump,
        checkRestingAction,
        getProperty,
        getPosition,
        getHP,
        getActions,
        getAction,
        getFrame,
        SPEED,
        SIZE,
        NAME,
    }
}

const Action = (animClass, frames, x, y, nextFrame) => {
    return {
        animClass,
        frames,
        x,
        y,
        nextFrame
    }
}

const Game = (() => {
    const DEFAULT_PACE = 33;
    const PACE = 50;

    const start = () => {
        Engine.initialize();
        setInterval(loop, PACE);
    }

    const loop = () => {
        Engine.update();
        Engine.display();
    }

    return {
        start
    }
})();

const Engine = (() => {
    const WIDTH = 800;
    const HEIGHT = 260;
    let ticks = 0;
    let entities = [];
    let screen;
    let player;
    let level;

    const initialize = () => {
        screen = document.getElementById('screen');
        player = Content.player();
        test();

        console.log(player);

        Controls.game();
    }

    const test = () => {
        addEntity(player);
        addEntity(Content.ball(150));
    }

    const update = () => {
        for ( let i = 0; i < entities.length; i++ ) {
            entities[i].move();
            entities[i].rest();

            switch ( entities[i].checkPlayer() ) {
                case true:
                    applyGravity(entities[i]);

                    console.log(checkCollision(entities[i]) === true && entities[i].getAction() === entities[i].getActions()[0]);

                    if ( (checkCollision(entities[i]) === true && entities[i].getAction() === entities[i].getActions()[0]) || 
                        (entities[i].getAction() !== entities[i].getActions()[0] && entities[i].getFrame < 1) ) {
                        entities[i].damage(5);
                    }
                    
                    break;
                case false:
                    if ( checkCollision(entities[i]) === true ) {
                        entities[i].damage(1);
                    }
                    break;
            }
            
            if ( entities[i].checkDeath() === true ) {
                console.log('death');
                removeEntity(i);
                i--;
                continue;
            }

            AI.determine(entities[i]);
            AI.spawn();

            ticks++;
        }

        for ( let i = 0; i < entities.length; i++ ) {
            
        }
    }

    const applyGravity = (entity) => {
        switch ( entity.NAME ) {
            case 'player':
                entity.accelerate(0, 3);
                break;
        }
    }

    const display = () => {
        for ( let i = 0; i < entities.length; i++ ) {
            draw(entities[i]);
        }
    }

    const draw = (entity) => {
        let property = entity.getProperty();
        let position = entity.getPosition();

        property.style.top = Structurer.px(position.y);
        property.style.left = Structurer.px(position.x);

        entity.animate();
    }

    const addEntity = (entity) => {
        entities.push(entity);
        screen.appendChild(entity.getProperty());
    }

    const removeEntity = (index) => {
        entities[index].die();
        entities.splice(index, 1);
    }

    const checkCollision = (entity) => {
        for ( let i = 0; i < entities.length; i++ ) {
            if ( entity !== entities[i] ) {
                let currentEntityPosX = entity.getPosition().x;
                let currentEntityPosY = entity.getPosition().y;
                let currentEntityWidth = entity.SIZE.width;
                let currentEntityHeight = entity.SIZE.height;

                let targetEntityPosX = entities[i].getPosition().x;
                let targetEntityPosY = entities[i].getPosition().y;
                let targetEntityWidth = entities[i].SIZE.width;
                let targetEntityHeight = entities[i].SIZE.height;

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

    const getPlayer = () => {
        return player;
    }

    const getTicks = () => {
        return ticks;
    }

    return {
        initialize,
        update,
        display,
        getPlayer,
        addEntity,
        getTicks,
        HEIGHT,
        WIDTH
    }
})();

const AI = (() => {
    const determine = (entity) => {
        switch ( entity.NAME ) {
            case 'ball':
                entity.accelerate(-5, 0);
                break;
        }
    }

    const spawn = () => {
        if ( Engine.getTicks() % 40 === 0 ) {
            Engine.addEntity(Content.ball((Engine.getTicks()%100) + 100));
        }
    }

    return {
        determine,
        spawn
    }
})();

const Controls = (() => {
    const game = () => {
        document.onkeydown = (e) => {
            let player = Engine.getPlayer();

            switch ( e.keyCode ) {
                case 37:
                    player.accelerate(-2, 0);
                    break;
                case 38:
                    if ( player.checkJump() === true ) {
                        player.accelerate(0, -100);
                    }
                    break;
                case 39:
                    player.accelerate(5, 0);
                    break;
                case 88:
                    if ( player.checkRestingAction() === true ) {
                        player.switchAction(2);
                    }
                    break;
                case 90:
                    if ( player.checkRestingAction() === true ) {
                        player.switchAction(1);
                    }
                    break;
            }
        }
    }
    return {
        game
    }
})();

const Content = (() => {
    const player = () => {
        let newPlayer = Entity(5, 5, 70, 80, 100, 30, 'player', ['entity', 'ken'], [
            playerRestingAnimation(),
            playerPunchingAnimation(),
            playerKickingAnimation()
        ]);

        newPlayer.initialize();

        return newPlayer;
    }

    const ball = (y) => {
        let newBall = Entity(700, y, 20, 20, 2, 40, 'ball', ['entity', 'ball'], []);

        newBall.initialize();

        return newBall;
    }

    const playerRestingAnimation = () => {
        let newAnimation = Action('ken', 4, 0, 80, 70);

        return newAnimation;
    }

    const playerPunchingAnimation = () => {
        let newAnimation = Action('ken', 3, 0, 160, 70)

        return newAnimation;
    }

    const playerKickingAnimation = () => {
        let newAnimation = Action('ken', 5, 0, 560, 70);

        return newAnimation;
    }

    return {
        player,
        ball
    }
})();

const Structurer = (() => {
    const abs = (number) => {
        if ( number < 0 ) {
            return -number;
        }

        return number;
    }

    const limit = (number, limit) => {
        if ( abs(number) > limit ) {
            if ( number < 0 ) {
                number = -limit;
                return number;
            } else if ( number > 0 ) {
                number = limit;
                return number;
            }
        }

        return number;
    }

    const bgPos = (number) => {
        return '-' + (number) + 'px';
    }

    const px = (number) => {
        return number + 'px';
    }

    return {
        abs,
        limit,
        bgPos,
        px
    }
})();

Game.start();

/*

var action = 'STANDING';
var which_frame = 0;

var character1={
    top: 185,
    left: 100,
    health: 100
}
var character2={
    top: 185,
    left: 400,
    health: 100
}

function GameLoop()
{
    displayCharacters();
}

setInterval(GameLoop, 150);


function displayCharacters()
{
    document.getElementById('character1').style.top = character1.top;
    document.getElementById('character1').style.left = character1.left;

    document.getElementById('character2').style.top = character2.top;
    document.getElementById('character2').style.left = character2.left;

    document.getElementById('healthbar1').style.width = character1.health*2.3;
    document.getElementById('healthbar2').style.width	 = character2.health*2.3;


    if(action == 'STANDING')
    {
        document.getElementById('character1').style.background = "url('ken.png') -"+which_frame*70+"px -80px";
        which_frame = which_frame+1;

        if(which_frame >= 4)
        {
            which_frame = 0;
        }
    }
    else if(action == 'PUNCH')
    {
        if(which_frame == 2 && character1.left > character2.left - 150 && character1.left < character2.left + 50)
        {
            character2.health = character2.health-5;
        }
        document.getElementById('character1').style.background = "url('ken.png') -"+which_frame*70+"px -160px";
        which_frame = which_frame+1;

        if(which_frame >= 3)
        {
            which_frame = 0;
            action = 'STANDING';
        }
    }
    else if(action == 'ROUND_KICK')
    {
        if(which_frame == 2 && character1.left > character2.left - 150 && character1.left < character2.left + 50)
        {
            character2.health = character2.health-8;
        }

        document.getElementById('character1').style.background = "url('ken.png') -"+which_frame*70+"px -560px";
        which_frame = which_frame+1;

        if(which_frame >= 5)
        {
            which_frame = 0;
            action = 'STANDING';
        }
    }
}

document.onkeydown = function(e)
{
    console.log(e);
    if(e.keyCode == 37 && character1.left > 0)
    {
        character1.left = character1.left-10;
    }
    else if(e.keyCode == 39 && character1.left < 800)
    {
        character1.left = character1.left+10;
    }
    else if(e.keyCode == 190)
    {
        action = 'PUNCH';
    }
    else if(e.keyCode == 191)
    {
        action = 'ROUND_KICK';
    }

    which_frame = 0;
}
displayCharacters();

*/