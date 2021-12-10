const fs = require('fs')

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const data = rawData.map(d => parseInt(d,2));

function common(data, power){;

    let zeros = data.filter(x => { return ((x & Math.pow(2,power)) == 0);});
    let ones = data.filter(x => { return ((x & Math.pow(2,power)) != 0);});

    let partitioned = (ones.length >= zeros.length) ? 
        { common: ones, uncommon: zeros} :
        { common: zeros, uncommon: ones};

     return partitioned
}

function findReading(data, power, finder){
    
    let found = finder(common(data, power));

    return (found.length == 1) ? found : findReading(found, power - 1, finder);
}

let n = rawData[0].length - 1;

let oxygen = findReading(data, n, x => x.common);
let c02 = findReading(data, n, x => x.uncommon);

let lifeSupport = oxygen * c02;

console.log(lifeSupport);