const fs = require('fs')

function getNeighbors(x,y,grid){
    const row = grid[y];
    let top = y > 0 ? grid[y-1][x] : null;
    let right = x < row.length - 1 ? grid[y][x+1] : null;
    let bottom = y < grid.length - 1 ? grid[y+1][x] : null;
    let left = x > 0 ? grid[y][x-1] : null;
    return [top, right, bottom, left];
}

function calculateRisk(height, x, y, top, right, bottom, left) {

    let lessThanTop = (top == null || top > height);
    let lessThanRight = (right == null || right > height);
    let lessThanBottom = (bottom == null || bottom > height);
    let lessThanLeft = (left == null || left > height);
    if (lessThanTop && lessThanRight && lessThanBottom && lessThanLeft) {
        return height + 1;
    }

    return 0;
}

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const data = rawData.map(row => row.split('').map(Number));

let risks = data.map((row,y) => row.map((cell,x) => calculateRisk(cell, x, y, ...getNeighbors(x,y,data))));

let sum = risks.reduce((accum, row)=>{ return accum + row.reduce((accum2, cell) => { return accum2 + cell}, 0); }, 0);

console.log(sum);