const fs = require('fs')

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const data = rawData
    .map(r => r.split(''));

function getNeighbors(grid, point) {
    let neighbors = [
        { x: point.x - 1,   y: point.y },
        { x: point.x,       y: point.y - 1 },
        { x: point.x + 1,   y: point.y },
        { x: point.x,       y: point.y + 1 }
    ];

    neighbors = neighbors.filter(cell => {
        return cell.x >= 0 &&
            cell.y >= 0 &&
            cell.x < grid[0].length &&
            cell.y < grid.length;
    });
    return neighbors;
}

function exploreFrontiers(state, data) {

    let current = state.frontier.pop();
    if(!current){
        return state;
    }

    //check current already visited and cheaper
    let visited = state.visited[current.y][current.x];
    let currentCost = state.cost + data[current.y][current.x];
    if(visited  && (visited.cost >= currentCost)){
        return state;
    }

    //if not new state where current is in previous,
    let newState = {
        frontier = state.frontier,
        cost: currentCost,
        previous: [...state.previous].push(current),
        visited = 
    };

}

let state = {
    current: {x:0, y:0},
    frontier: [],
    cost: 0,
    previous: [],
    visited: {}
};

state = exploreFrontiers(state, data);

let maxY = data.length -1;
let maxX = data[maxY].length - 1;

let risk = finalState.visited[maxY,maxX];

console.log(risk.path);
console.log(risk.cost);