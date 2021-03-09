const Entity = (x, y, type, classes) => {
    const WIDTH = '20px';
    const HEIGHT = '20px'; // should factor in collision
    let position = {
        x: x,
        y: y
    }
    let property = document.createElement('div');
    property.style.width = WIDTH;
    property.style.height = HEIGHT;

    const addClasses = () => {
        property.classList.add(classes.shift());

        if ( classes.length > 0 ) {
            addClasses();
        }
    }

    const movePosition = (moveX, moveY) => {
        position.x += moveX;
        position.y += moveY;
    }

    const getProperty = () => {
        return property;
    }

    const getPosition = () => {
        return position;
    }

    addClasses();

    return {
        getProperty,
        movePosition,
        position,
        property,
        type
    }
}

const Pacman = (() => {
    let character = Entity(10, 10, 'player', [
        'pacman',
        'entity'
    ])

    const SPEED = 4;
    let movement = {
        x: SPEED,
        y: 0
    }

    const display = () => {
        character.style.top = y + 'px';
        character.style.left = x + 'px';
    }

    const controlsGame = () => {
        document.onkeydown = (e) => {
            switch (e.keyCode) {
                case 37:
                    movement.x = -SPEED;
                    movement.y = 0;
                    break;
                case 38:
                    movement.y = -SPEED;
                    movement.x = 0;
                    break;
                case 39:
                    movement.x = SPEED;
                    movement.y = 0;
                    break;
                case 40:
                    movement.y = SPEED;
                    movement.x = 0;
                    break;
            }
            console.log(e.keyCode);
        }
    }

    return {
        character,
        movement,
        controlsGame
    }
})();

const Level = (() => {
    let dimensions = {
        height: 0,
        width: 0
    };

    let worlds = {
        maze: [
            '2222222222222222222',
            '2000000002000000002',
            '2022022202022202202',
            '2000000000000000002',
            '2022020222220202202',
            '2000020002000200002',
            '2222022202022202222',
            '2222020000000202222',
            '2222000222220002222',
            '2222020000000202222',
            '2222022202022202222',
            '2000020002000200002',
            '2022020222220202202',
            '2000000003000000002',
            '2022022202022202202',
            '2000000002000000002',
            '2222222222222222222',
            ]
    }

    const initialize = () => {
        loadWorld(worlds.maze);
        //createWorld(height, width);

        //dimensions.height = height * Game.SIZE;
        //dimensions.width = width * Game.SIZE;

        //Pacman.character.position.x = dimensions.width / 2;
        //Pacman.character.position.y = dimensions.height / 2;

        //Game.pushEntities(Pacman.character);
    }

    const loadWorld = (array) => {
        for ( let y = 0; y < array.length; y++ ) {
            for ( let x = 0; x < array[y].length; x++ ) {
                let newEntity = getEntity(array[y][x], x, y);
                Game.pushEntities(newEntity);
            }
        }
    }

    const getEntity = (number, x, y) => {
        number = parseInt(number);
        x *= Game.SIZE;
        y *= Game.SIZE;

        switch ( number ) {
            case 0:
                return Entity(x, y, 'coin', ['entity', 'coin']);
            case 2:
                return Entity(x, y, 'wall', ['entity', 'brick']);
            case 3:
                Pacman.character.position.x = x;
                Pacman.character.position.y = y;
                return Pacman.character;
        }
    }

    const createWorld = (height, width) => {
        for ( let i = 0; i < height; i++ ) {
            if ( i === 0 || i === (height - 1) ) {
                addRow(width, i, true);
            } else {
                addRow(width, i, false);
            }
        }
    }

    const addRow = (width, height, isEdge) => {
        for ( let i = 0; i <= (width - 1); i++ ) {
            let newWall = Entity((i * Game.SIZE), (height * Game.SIZE), 'wall', [
                'entity',
                'brick'
            ]);
            if ( isEdge === true ) {
                Game.pushEntities(newWall);
            } else if ( i === 0 || i === (width - 1) ) {
                Game.pushEntities(newWall);
            } //else {
            //    newRow.push(1);
            //}
        }
    }

    const displayWorld = () => {
        let output = '';

        for ( let y = 0; y < world.length; y++ ) {
            output += '<div class="row">';

            for ( let x = 0; x < world[y].length; x++ ) {
                output += displayBlock(world[y][x]);
            }

            output += '</div>';
        }

        document.getElementById('world').innerHTML = output;
    }

    const displayBlock = (type) => {
        switch(type) {
            case 0:
                return '<div class="empty"></div>';
            case 1:
                return '<div class="coin"></div>';
            case 2:
                return '<div class="brick"></div>'
        }
    }

    return {
        initialize,
        displayWorld,
        dimensions
    }
})();

const Game = (() => {
    const SIZE = 20;
    let score = 0;
    let entities = [];
    let gameplay = false;
    let pacman = Pacman.character;
    let world = document.querySelector('.world');

    const start = () => {
        gameplay = true;

        Pacman.controlsGame();
        setInterval(loop, 33);
    }

    const loop = () => {
        update();
        display();
    }

    const update = () => {
        let pacmanCollision = checkPacmanCollision(pacman, Pacman.movement);
        if ( pacmanCollision === 'coin' || pacmanCollision === false ) {
            pacman.movePosition(Pacman.movement.x, Pacman.movement.y);
        }

        for ( let i = 0; i < entities.length; i++ ) {
            if ( checkCollision(entities[i]) === true && entities[i].type === 'coin' ) {
                console.log('Collide!');
                score++;
                entities.splice(i, 1);
                i--;
            }
        }
    }

    const checkCollision = (entity) => {
        for ( let i = 0; i < entities.length; i++ ) {
            if ( entity !== entities[i] ) {
                //let collisi
                if ( entity.position.x < entities[i].position.x + SIZE &&
                    (entity.position.x + SIZE) > entities[i].position.x && 
                    entity.position.y < entities[i].position.y + SIZE &&
                    (entity.position.y + SIZE) > entities[i].position.y ) {
                    return true;
                }
            }
        }

        return false;
    }

    const checkPacmanCollision = (entity, movement) => {
        for ( let i = 0; i < entities.length; i++ ) {
            if ( entity !== entities[i] ) {
                //let collisi
                if ( ((entity.position.x + movement.x) < entities[i].position.x + SIZE &&
                    (entity.position.x + movement.x + SIZE) > entities[i].position.x) && 
                    ((entity.position.y + movement.y) < entities[i].position.y + SIZE &&
                    (entity.position.y + movement.y + SIZE) > entities[i].position.y) ) {
                    return entities[i].type;
                }
            }
        }

        return false;
    }

    const display = () => {
        world.innerHTML = '';
        for ( let i = 0; i < entities.length; i++ ) {
            let currentEntity = entities[i];
            world.appendChild(currentEntity.property);
            currentEntity.property.style.top = currentEntity.position.y;
            currentEntity.property.style.left = currentEntity.position.x;
        }
    }

    const pushEntities = (entity) => {
        entities.push(entity);
    }

    return {
        start,
        pushEntities,
        SIZE
    }
})();

Level.initialize();
Game.start();