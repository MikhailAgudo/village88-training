const Level = (() => {
    let world;

    const initialize = (height, width) => {
        world = []
    }

    const createWorld = (height, width) => {

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
    }

    return {

    }
})();