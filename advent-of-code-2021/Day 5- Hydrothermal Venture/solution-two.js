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

    if(from.x > to.x){
        let temp = from;
        from = to;
        to = temp;
    }

    let slope = (to.y - from.y)/(to.x - from.x);
    let diagonalDown = Math.abs(slope + 1) < Number.EPSILON;
    let diagonalUp = Math.abs(slope - 1) < Number.EPSILON;
    let isDiagonal =  diagonalDown || diagonalUp; 
    let intercept = from.y - (slope * from.x);
    let calc = y - (slope * x) - intercept;
    let onLine = Math.abs(calc) < Number.EPSILON;

    if (onLine){
        if(diagonalUp) {
            let greaterThanMin = (y >= from.y && x >= from.x);
            let lessThanMax = (y <= to.y && x <= to.x);
            return greaterThanMin && lessThanMax;
        }
        else if(diagonalDown) {
            let greaterThanMin = (y <= from.y && x >= from.x);
            let lessThanMax = (y >= to.y && x <= to.x);
            return greaterThanMin && lessThanMax;
        }
        else {
            return false;
        }
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