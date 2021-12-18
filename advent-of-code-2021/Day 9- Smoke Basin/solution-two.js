const fs = require('fs')

function getNeighbors(x,y,grid){
    const row = grid[y];
    let top = y > 0 ? grid[y-1][x] : null;
    let right = x < row.length - 1 ? grid[y][x+1] : null;
    let bottom = y < grid.length - 1 ? grid[y+1][x] : null;
    let left = x > 0 ? grid[y][x-1] : null;
    return [top, right, bottom, left];
}

function getLowPoints(height, x, y, top, right, bottom, left) {

    let lessThanTop = (top == null || top > height);
    let lessThanRight = (right == null || right > height);
    let lessThanBottom = (bottom == null || bottom > height);
    let lessThanLeft = (left == null || left > height);
    if (lessThanTop && lessThanRight && lessThanBottom && lessThanLeft) {
        return {x,y};
    }
}

function getBasinNeighbors(coord, universe){
    const row = universe[coord.y];
    let top =       {x: coord.x,        y: coord.y - 1 };
    let right =     {x: coord.x + 1,    y: coord.y };
    let bottom =    {x: coord.x,        y: coord.y + 1 };
    let left =      {x: coord.x - 1,    y: coord.y };

    let basinNeighbors = [top,right,bottom,left]
        .filter(xy => xy.x >= 0 && xy.x < row.length && xy.y >= 0 && xy.y < universe.length)
        .filter(xy => universe[xy.y][xy.x] < 9);

    return basinNeighbors;
}

function exploreBasin(basin, universe){
    let startBasinLength = basin.length;
    let newNeighbors = [];
    for (let i = 0; i < startBasinLength; i++) {
        const coord = basin[i];
        neighbors = getBasinNeighbors(coord, universe);
        neighbors = neighbors.filter(n => !(basin.find(xy => xy.x === n.x && xy.y === n.y)));
        neighbors = neighbors.filter(n => !(newNeighbors.find(xy => xy.x === n.x && xy.y === n.y)));
        if(neighbors && neighbors.length > 0){
            newNeighbors.push(...neighbors);
        }
    }
    if(newNeighbors && newNeighbors.length > 0) {
        basin.push(...newNeighbors);
        return exploreBasin(basin,universe);
    }
    else{
        return basin;
    }
    
}

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const data = rawData.map(row => row.split('').map(Number));

let lowPoints = data.map((row,y) => row.map((cell,x) => getLowPoints(cell, x, y, ...getNeighbors(x,y,data))));
lowPoints = lowPoints.flat().filter(x => x);

basins = lowPoints.map(lowest => { 
    let basin = [lowest];
    basin = exploreBasin(basin, data);
    return basin; 
});

let basinLengths = basins.map(x => x.length);

basinLengths.sort((a,b) => b-a);

let top3Largest = basinLengths.slice(0,3);

let product = top3Largest.reduce((acc,x) => x * acc, 1);

console.log(product);