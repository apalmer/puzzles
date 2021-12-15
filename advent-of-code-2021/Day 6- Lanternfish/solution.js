const fs = require('fs')

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

let school = rawData[0]
    .split(',')
    .map(s => parseInt(s));

let daysToIterate = 256;

for (let day = 1; day <= daysToIterate; day++) {
    let todaysLength = school.length;
    for (let i = 0; i < todaysLength; i++) {
        if(school[i] == 0) {
            school.push(8);
            school[i] = 6;
        }
        else {
            school[i]--;
        }
    }
}

console.log(school.length)