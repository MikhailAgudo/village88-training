const Game = (() => {
    const startGame = () => {
        setInterval(loop, 33);
    }

    const loop = () => {
        Engine.update();
        Engine.display();
    }

    return {
        startGame
    }
})();

const Engine = (() => {
    let pause = false;
    let entities = [];
    let player;
    let screen;

    const initialize = () => {
        screen = document.getElementById('screen');
    }

    const update = () => {

    }

    const checkHits = (index) => {

    }

    const display = () => {
        for ( let i = 0; i < entities.length; i++ ) { 
            draw(entities[i]);
        }
    }

    const draw = (entity) => {
        entity.property.style.top = entity.position.y;
        entity.property.style.left = entity.position.x;
    }

    const removeEntity = (index) => {
        entities[index].property.innerHTML = '';
        entities.splice(index, 1);
    }

    const switchControls = (value) => {
        switch ( value ) {
            case 0:
                break;
            case 1:
                gameControls();
                break;
        }
    }

    const gameControls = () => {
        document.onkeydown = (e) => {
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

    const checkCollision = (entity) => {
        for ( let i = 0; i < entities.length; i++ ) {
            if ( entity !== entities[i] ) {
                // The variables are for readability
                let currentEntityPosX = entity.position.x;
                let currentEntityPosY = entity.position.y;
                let currentEntityWidth = entity.SIZE.width;
                let currentEntityHeight = entity.SIZE.height;

                let targetEntityPosX = entities[i].position.x;
                let targetEntityPosY = entities[i].position.y;
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
    return {
        initialize,
        update,
        display
    }
})();

const Content = (() => {
    return {

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
    let hits = [0, hits]
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
    }

    const checkDeath = () => {
        if ( hits[0] === hits[1] ) {
            return true;
        } else {
            return false;
        }
    }

    return {
        initialize,
        move,
        checkDeath,
        SPEED,
        SIZE,
        NAME,
        property,
        hits,
        position
    }
}