const Game = (() => {
    const start = () => {
        Engine.initialize();
        setInterval(loop, 33);
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
    let ticks = 0;
    let pause = false;
    let entities = [];
    let player;
    let view = 0;
    let gameOver = false;
    let screen;
    let height = 600;
    let width = 800;
    let level;

    const initialize = () => {
        screen = document.getElementById('screen');
        player = Content.player();
        addEntity(player);
        addEntity(Content.enemy1(500, 0));
        switchControls(1);
    }

    const test = () => {

    }

    const update = () => {
        ticks++;

        for ( let i = 0; i < entities.length; i++ ) {
            if ( entities[i].checkDeath() === true ) {
                if ( player === entities[i] ) {
                    gameOver = true;
                    break;
                } else {
                    removeEntity(i);
                    i--;
                }
            }

            if ( entities[i].checkOutOfBounds() === true ) { // Remove AI entities out of bounds
                removeEntity(i);
                i--;
            }

            if ( checkCollision(entities[i]) === true ) {
                console.log('Damage Report!');
                entities[i].damage(1);
            }

            AI.determine(entities[i]);
        }

        if ( gameOver === true ) {
            // Lose
        }
    }

    const display = () => {
        for ( let i = 0; i < entities.length; i++ ) { 
            draw(entities[i]);
        }
    }

    const draw = (entity) => {
        let property = entity.getProperty();
        property.style.top = entity.getY() + 'px'; // Don't forget 'px'
        property.style.left = entity.getX() + 'px';
    }

    const addEntity = (entity) => {
        entities.push(entity);
        screen.appendChild(entity.getProperty());
    }

    const removeEntity = (index) => {
        entities[index].die();
        entities.splice(index, 1);
    }

    const switchControls = (value) => {
        switch ( value ) {
            case 0:
                break;
            case 1:
                Controls.game();
                break;
        }
    }

    const checkCollision = (entity) => {
        for ( let i = 0; i < entities.length; i++ ) {
            if ( entity !== entities[i] ) {
                // The variables are for readability
                let currentEntityPosX = entity.getX();
                let currentEntityPosY = entity.getY();
                let currentEntityWidth = entity.SIZE.width;
                let currentEntityHeight = entity.SIZE.height;

                let targetEntityPosX = entities[i].getX();
                let targetEntityPosY = entities[i].getY();
                let targetEntityWidth = entities[i].SIZE.width;
                let targetEntityHeight = entities[i].SIZE.height;

                if ( currentEntityPosX < targetEntityPosX + targetEntityWidth && 
                    currentEntityPosX + currentEntityWidth > targetEntityPosX && 
                    currentEntityPosY < targetEntityPosY + targetEntityHeight && 
                    currentEntityPosY + currentEntityHeight > targetEntityPosY ) {
                    return true;
                }
            }
        }

        return false;
    }

    const loadLevel = () => {
        // An array containing content appearing, and the time/tick that they appear
    }

    const getPlayer = () => {
        return player;
    }

    const getHeight = () => {
        return height;
    }

    const getWidth = () => {
        return width;
    }

    return {
        initialize,
        update,
        display,
        getPlayer,
        getHeight,
        getWidth
    }
})();

const AI = (() => {
    const determine = (entity) => {
        switch ( entity.NAME ) {
            case 'player':
                break;
            case 'enemy1':
                entity.move(0, entity.SPEED);
                break;
        }
    }

    return {
        determine
    }
})();

const Content = (() => {
    let levels = [];

    const player = () => {
        let height = parseInt(Engine.getHeight() * 0.9);
        let width = parseInt(Engine.getWidth() / 2);
        let classes = ['entity', 'player'];

        let newPlayer = Entity(height, width, 28, 28, 3, 10, 'player', classes);

        newPlayer.initialize();

        return newPlayer;
    }

    const enemy1 = (x, y) => {
        let classes = ['entity', 'enemy1'];

        let newEnemy = Entity(x, y, 28, 28, 1, 3, 'enemy1', classes);

        newEnemy.initialize();

        console.log(newEnemy);

        return newEnemy;
    }

    return {
        player,
        enemy1
    }
})();

const Controls = (() => {
    const game = () => {
        document.onkeydown = (e) => {
            let player = Engine.getPlayer();

            switch ( e.keyCode ) {
                case 37:
                    player.move(-player.SPEED, 0);
                    break;
                case 38:
                    player.move(0, -player.SPEED);
                    break;
                case 39:
                    player.move(player.SPEED, 0);
                    break;
                case 40:
                    player.move(0, player.SPEED);
                    break;
            }
        }
    }

    return {
        game
    }
})();

const Entity = (x, y, width, height, hits, speed, name, classes) => {
    const SPEED = speed;
    const SIZE = {
        width: width,
        height: height
    }
    const NAME = name;
    let property = document.createElement('div');
    let HP = [0, hits]
    let position = {
        x: x,
        y: y
    }

    const initialize = () => {
        addClasses();

        property.style.width = SIZE.width;
        property.style.height = SIZE.height;
    }

    const addClasses = () => {
        property.classList.add(classes.shift());

        if ( classes.length > 0 ) {
            addClasses();
        }
    }

    const move = (x, y) => {
        position.x += x;
        position.y += y;

        adjustOverflow();
    }

    const repair = (value) => {
        HP[0] -= value;

        if ( HP[0] < 0 ) {
            HP[0] = 0;
        }
    }

    const damage = (value) => {
        HP[0] += value;

        if ( HP[0] > HP[1] ) {
            HP[0] = HP[1];
        }
    }

    const checkDeath = () => {
        if ( HP[0] === HP[1] ) {
            console.log('Dead');
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
        if ( position.x + SIZE.width > Engine.getWidth() ) {
            return true;
        } else if ( position.x < 0 ) {
            return true;
        }

        if ( position.y + SIZE.height > Engine.getHeight() ) {
            return true;
        } else if ( position.y < 0 ) {
            return true;
        }

        return false;
    }

    const die = () => {
        property.remove();
    }

    const adjustOverflow = () => { // Eventually optimize by merging with checkOutOfBounds()
        if ( checkPlayer() === true ) {
            if ( position.x + SIZE.width > Engine.getWidth() ) {
                position.x = Engine.getWidth() - SIZE.width;
            } else if ( position.x < 0 ) {
                position.x = 0;
            }
    
            if ( position.y + SIZE.height > Engine.getHeight() ) {
                position.y = Engine.getHeight() - SIZE.height;
            } else if ( position.y < 0 ) {
                position.y = 0;
            }
        }
    }

    const getProperty = () => {
        return property;
    }

    const getX = () => {
        return position.x;
    }

    const getY = () => {
        return position.y;
    }

    const getHP = () => {
        return HP;
    }

    return {
        initialize,
        move,
        repair,
        damage,
        checkDeath,
        checkOutOfBounds,
        die,
        getProperty,
        getHP,
        getX,
        getY,
        SPEED,
        SIZE,
        NAME,
    }
}

Game.start();