const fs = require('fs');
const { networkInterfaces } = require('os');

function getTargetBounds(data) {
    let targetBounds = {};

    const parser = /target area: x=(.*)\.\.(.*), y=(.*)\.\.(.*)/

    let m = data.match(parser);
    if (m) {
        targetBounds.targetFromX = parseInt(m[1], 10);
        targetBounds.targetToX = parseInt(m[2], 10);
        targetBounds.targetFromY = parseInt(m[3], 10);
        targetBounds.targetToY = parseInt(m[4], 10);
    }

    targetBounds.minY = Math.min(targetBounds.targetFromY, targetBounds.targetToY)
    targetBounds.maxY = Math.max(targetBounds.targetFromY, targetBounds.targetToY)

    targetBounds.minX = Math.min(targetBounds.targetFromX, targetBounds.targetToX)
    targetBounds.maxX = Math.max(targetBounds.targetFromX, targetBounds.targetToX)

    return targetBounds;
}

function keepTracking(position, state) {
    let x = position[0];
    let y = position[1];

    return state.velocity[1] > 0 || y >= state.targetBounds.minY;
};

function insideTarget(position, targetBounds) {
    let x = position[0];
    let y = position[1];

    return x >= targetBounds.minX && x <= targetBounds.maxX && y >= targetBounds.minY && y <= targetBounds.maxY
}

function calculatePath(state) {

    let newState = Object.assign({}, state);

    while (keepTracking(newState.position, newState) && !newState.inTarget) {
        newState.position[0] += newState.velocity[0];
        newState.position[1] += newState.velocity[1];
        
        if(newState.position[1] > newState.maxHeight){
            newState.maxHeight = newState.position[1];
        }

        newState.path.push([...newState.position]);
        if (insideTarget(newState.position, newState.targetBounds)) {
            newState.inTarget = true;
            break;
        }

        if (newState.velocity[0] > 0) {
            newState.velocity[0] -= 1;
        }
        else if (newState.velocity[0] < 0) {
            newState.velocity[0] += 1;
        }

        newState.velocity[1] -= 1;
    }

    if(!newState.inTarget){
        newState.maxHeight = -Infinity;
    }

    return newState;
}

function render(state) {

    let extremes = {
        minX: Infinity,
        maxX: -Infinity,
        minY: Infinity,
        maxY: -Infinity
    };

    state.path.forEach(p => {
        let x = p[0];
        let y = p[1];
        if (x < extremes.minX) {
            extremes.minX = x;
        }
        if (x > extremes.maxX) {
            extremes.maxX = x;
        }
        if (y < extremes.minY) {
            extremes.minY = y;
        }
        if (y > extremes.maxY) {
            extremes.maxY = y;
        }
    });

    let yMin = Math.min(extremes.minY, state.initial[1], state.targetBounds.minY)
    let yMax = Math.max(extremes.maxY, state.initial[1], state.targetBounds.maxY)

    let xMin = Math.min(extremes.minX, state.initial[0], state.targetBounds.minX)
    let xMax = Math.max(extremes.maxX, state.initial[0], state.targetBounds.maxX)

    let buffers = [];
    for (let y = yMax; y >= yMin; y--) {
        let rowIdentifier = y.toString().padStart(4, '*');
        let buffer = [rowIdentifier];
        for (let x = xMin; x < xMax + 1; x++) {
            if (x == state.initial[0] && y == state.initial[1]) {
                buffer.push('S');
            }
            else if (state.path.find(p => p[0] == x && p[1] == y)) {
                buffer.push('#')
            }
            else if (insideTarget([x, y], state.targetBounds)) {
                buffer.push('T');
            }
            else {
                buffer.push('.');
            }
        }
        buffer.push('\r\n');
        buffers.push(buffer.join(''));
    }
    return buffers.join('');
}

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

let targetBounds = getTargetBounds(rawData[0]);

let lowerX = -1000;
let upperX = 1000;
let lowerY = -1000;
let upperY = 1000;

let maxHeight = -Infinity;
let inTarget = [];

for (let x = lowerX; x <= upperX; x++) {
    for (let y = lowerY; y <= upperY; y++) {

        let velocity = [x, y];
        let initialPosition = [0, 0];

        let state = {
            initial: [...initialPosition],
            position: [...initialPosition],
            velocity: [...velocity],
            path: [initialPosition],
            targetBounds: targetBounds,
            inTarget: insideTarget(initialPosition, targetBounds),
            maxHeight: -Infinity
        };

        state = calculatePath(state);

        if(state.maxHeight > maxHeight){
            maxHeight = state.maxHeight;
        }

        if(state.inTarget){
            inTarget.push(state.inTarget);
        }

    }
}

console.log(maxHeight);
console.log(inTarget.length);
for (let index = 0; index < inTarget.length; index++) {
    const element = inTarget[index];
    console.log(element);
}