const fs = require('fs')

function raiseEnergy(universe) {
    for (let y = 0; y < universe.data.length; y++) {
        for (let x = 0; x < universe.data[y].length; x++) {
            universe.data[y][x]++;
        }
    }

    return universe;
}

function getNeighbors(universe, y, x) {

    let possibles = [
        { x: x - 1, y: y - 1 },
        { x: x, y: y - 1 },
        { x: x + 1, y: y - 1 },

        { x: x - 1, y: y },
        { x: x + 1, y: y },

        { x: x - 1, y: y + 1 },
        { x: x, y: y + 1 },
        { x: x + 1, y: y + 1 }
    ];

    let actuals = possibles.filter(p => p.x >= 0 && p.x < universe.data[0].length && p.y >= 0 && p.y < universe.data.length);

    return actuals;
}

function flashOctopus(universe, y, x) {

    if (universe.data[y][x] > 9) {
        let alreadyFlashed = universe.state.flashed.find(f => f.x === x && f.y === y);
        if(!alreadyFlashed) {
            universe.state.flashCount++;
            universe.state.flashed.push({x:x,y:y});

            let neighbors = getNeighbors(universe, y, x);

            neighbors.forEach(neighbor => {
                universe.data[neighbor.y][neighbor.x]++;
            });

            neighbors.forEach(neighbor => {
                universe = flashOctopus(universe, neighbor.y, neighbor.x);
            });
        }
    }

    return universe;
}

function flashOctopi(universe) {

    for (let y = 0; y < universe.data.length; y++) {
        for (let x = 0; x < universe.data[y].length; x++) {
            universe = flashOctopus(universe, y, x);
        }
    }

    return universe;
}

function resetFlashed(universe) {

    universe.state.flashed.forEach(element => {
        universe.data[element.y][element.x] = 0;
    });

    state.flashed = [];

    return universe;
}

function iterate(universe, iterations) {
    if(iterations == 0) {
        return universe;
    }
    else {
        let raised = raiseEnergy(universe);
        let flashed = flashOctopi(raised);
        let resetted = resetFlashed(flashed);

        return iterate(resetted, iterations - 1);
    }
}

function renderVisual(grid) {

    let vis = '';

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            vis += grid[y][x];
            //vis += "|"
        }
        vis += "\r\n";
    }

    return vis;
}

const iterations = 1000;

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const data = rawData.map(x => x.split('').map(Number));
const state = { flashed: [], flashCount: 0 };
const universe = {
    data:data, 
    state:state
};

let results = iterate(universe, iterations);

let visual = renderVisual(results.data);
console.log(visual);
console.log(results.state.flashCount);