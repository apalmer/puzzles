const fs = require('fs')

function parseLineSegment(text){
    let parser = /(?<from_x>\d+),(?<from_y>\d+) -> (?<to_x>\d+),(?<to_y>\d+)/;
    let match = text.match(parser);
    if(match){    
        return {
            from: { 
                x: parseInt(match.groups.from_x), 
                y: parseInt(match.groups.from_y)
            },
            to: {
                x: parseInt(match.groups.to_x), 
                y: parseInt(match.groups.to_y)
            }
        }
    }
}

function isInLine(x,y, from, to){
    let epsilon = 0.00000001;

    let vertical = to.x === from.x;
    if(vertical) {
        let onLine = x === to.x;
        let greaterThanMin = y >= Math.min(from.y, to.y);
        let lessThanMax = y <= Math.max(from.y, to.y);
        return onLine && greaterThanMin && lessThanMax;
    }
    
    let horizontal = to.y === from.y;
    if(horizontal){
        let onLine = y === to.y;
        let greaterThanMin = x >= Math.min(from.x, to.x);
        let lessThanMax = x <= Math.max(from.x, to.x);
        return onLine && greaterThanMin && lessThanMax;
    }

    return false;
}

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const data = rawData.map(parseLineSegment);

const columns = 1000
const rows = 1000
const universe = Array.from(Array(columns), () => Array(rows).fill(0))

numOverlap = 0;
for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
        data.forEach(line => {
            if(isInLine(x,y, line.from, line.to)){
                universe[y][x]++;
            }
        });
        if(universe[y][x] >= 2){
            numOverlap++;
        }      
    }
}

console.log(numOverlap);