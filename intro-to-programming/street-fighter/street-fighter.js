// Ken will dodge bullets from machine guns and kill street people

const Entity = (x, y, width, height, hits, speed, name, anims) => {
    const SPEED = speed;
    const SIZE = {
        width: width,
        height: height
    };
    const NAME = name;
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
    let animations = anims;

    const initialize = () => {
        property.classList.add('entity');

        property.style.width = SIZE.width + 'px';
        property.style.height = SIZE.height + 'px';

        addClasses();
    }

    const addClasses = () => {
        property.classList.add(anims.shift());

        if ( anims.length > 0 ) {
            addClasses();
        }
    }

    const move = () => {
        position.x += momentum.x;
        position.y += momentum.y;

        if ( checkOutOfBounds() === false ) {
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
        }

        return false;
    }

    const checkJump = () => {
        console.log('Player' + (position.x + SIZE.height));
        console.log('Screen' + (Engine.HEIGHT - 10));
        if ( (position.y + SIZE.height) > (Engine.HEIGHT - 10) ) {
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

    const getAnimations = () => {
        return animations;
    }

    return {
        initialize,
        move,
        accelerate,
        rest,
        damage,
        heal,
        die,
        checkDeath,
        checkPlayer,
        checkJump,
        getProperty,
        getPosition,
        getHP,
        getAnimations,
        SPEED,
        SIZE,
        NAME
    }
}

const Animation = (bgClass, frames, pace) => {

}

const Level = () => {
    return {

    }
}

const Game = (() => {
    const start = () => {
        Engine.initialize();
        setInterval(loop ,33);
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
    }

    const update = () => {
        for ( let i = 0; i < entities.length; i++ ) {
            entities[i].move();
            entities[i].rest();

            if ( entities[i].checkPlayer() === true ) {
                applyGravity(entities[i]);
            }
        }
    }

    const applyGravity = (entity) => {
        switch ( entity.NAME ) {
            case 'player':
                entity.accelerate(0, 2);
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

        property.style.top = position.y + 'px';
        property.style.left = position.x + 'px';
    }

    const addEntity = (entity) => {
        entities.push(entity);
        screen.appendChild(entity.getProperty());
    }

    const getPlayer = () => {
        return player;
    }

    return {
        initialize,
        update,
        display,
        getPlayer,
        HEIGHT,
        WIDTH
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
            }
        }
    }
    return {
        game
    }
})();

const Content = (() => {
    const player = () => {
        let newPlayer = Entity(5, 5, 70, 80, 100, 30, 'player', ['entity', 'ken']);

        newPlayer.initialize();

        return newPlayer;
    }

    return {
        player
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
    return {
        abs,
        limit
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