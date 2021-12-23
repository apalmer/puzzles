const fs = require('fs')

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const pointParser = /(\d*)\,(\d*)/;
const foldParser = /fold along (x|y)=(\d*)/;

const data = {
    points: [],
    folds: []
}

rawData.forEach(line => {
    let p = line.match(pointParser);
    if (p) {
        data.points.push({ x: parseInt(p[1]), y: parseInt(p[2]) });
    }
    let f = line.match(foldParser);
    if (f) {
        data.folds.push({ dimension: f[1], value: parseInt(f[2]) });
    }
});

function splitOnAxis(points, axis) {
    let bottom = [];
    let top = [];

    points.forEach(point => {
        if (point[axis.dimension] < axis.value) {
            bottom.push(point);
        }
        else if (point[axis.dimension] > axis.value) {
            top.push(point);
        }
    });

    return {
        bottom: bottom,
        top: top
    };
}

function reflect(points, axis) {

    let reflected = points.map(p => {
        let r = { x: p.x, y: p.y };
        r[axis.dimension] = axis.value - (p[axis.dimension] - axis.value);
        return r;
    })

    return reflected;
}

function combine(alpha, beta) {
    let combined = [];
    alpha.forEach(a => {
        combined.push({ x: a.x, y: a.y });
    });
    beta.forEach(b => {
        if (!combined.find(c => c.x == b.x && c.y == b.y)) {
            combined.push({ x: b.x, y: b.y });
        }
    });
    return combined;
}

function fold(points, axis) {
    let { bottom, top } = splitOnAxis(points, axis);

    let topPrime = reflect(top, axis);

    let combined = combine(bottom, topPrime);

    return combined;
}

function render(points, maxX, maxY) {

    let domain = []
    for (let y = 0; y <= maxY; y++) {
        let row = [];
        for (let x = 0; x <= maxX; x++) {
            row.push('.')
        }
        domain.push(row);
    }

    points.forEach(point => {
        domain[point.y][point.x] = '#';
    });

    let str = "";
    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            str += domain[y][x];
        }
        str += "\r\n";
    }

    return str;
}

let points = data.points;
data.folds.forEach(axis => {
    points = fold(points,axis);
});

let xs = points.map(p => p.x);
let maxX = Math.max(...xs);
let ys = points.map(p => p.y);
let maxY = Math.max(...ys);

let rendered = render(points, maxX, maxY);

console.log(rendered);
console.log(points.length)