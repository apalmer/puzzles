const fs = require('fs')

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .replace("\r\n","")
    .split(",")
    .map(Number);

let min = Math.min(...rawData);
let max = Math.max(...rawData);

let lowest = { destination: min, cost: Infinity };

for (let curr = min; curr <= max; curr++) {
    let costs = rawData.map(x => Math.abs(x - curr));
    let cost = costs.reduce((x,acc) => { return x + acc });
    if(cost < lowest.cost){
        lowest.destination = curr;
        lowest.cost = cost;
    }
}

console.log(lowest);