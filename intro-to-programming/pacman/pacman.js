const Entity = (x, y, classes) => {
    const WIDTH = '20px';
    const HEIGHT = '20px'; // should factor in collision
    let position = {
        x: x,
        y: y
    }
    let property = document.createElement('div');

    const initialize = () => {
        property.style.width = WIDTH;
        property.style.height = HEIGHT;

        addClasses();
    }

    const addClasses = () => {
        property.classList.add(classes.shift());

        if ( classes.length > 0 ) {
            addClasses();
        }
    }

    const getProperty = () => {
        return property;
    }

    const getPosition = () => {
        return {x, y};
    }

    const setX = () => {

    }

    return {
        initialize,
        getProperty,
        getPosition
    }
}

const Pacman = (() => {
    let pacman = document.getElementById('pacman');
    let x = 10;
    let y = 10;

    const display = () => {
        pacman.style.top = y + 'px';
        pacman.style.left = x + 'px';
    }

    document.onkeydown = (e) => {
        switch (e.keyCode) {
            case 37:
                x--;
                break;
            case 38:
                y--;
                break;
            case 39:
                x++;
                break;
            case 40:
                y++;
                break;
        }

        display();
        console.log(e.keyCode);
    }
    return {
        display
    }
})();

const Level = (() => {
    let world;

    const initialize = (height, width) => {
        world = createWorld(height, width);
    }

    const createWorld = (height, width) => {
        let newWorld = [];

        for ( let i = 0; i < height; i++ ) {
            if ( i === 0 || i === (height - 1) ) {
                newWorld.push(addRow(width, true));
            } else {
                newWorld.push(addRow(width, false));
            }
        }

        return newWorld;
    }

    const addRow = (width, isEdge) => {
        let newRow = [];

        for ( let i = 0; i < width; i++ ) {
            if ( isEdge === true ) {
                newRow.push(2);
            } else if ( i === 0 || i === (width - 1) ) {
                newRow.push(2);
            } else {
                newRow.push(1);
            }
        }

        return newRow;
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
        displayWorld
    }
})();

const Game = (() => {

})();

Pacman.display();
Level.initialize(9, 10);
console.log(Level.displayWorld());