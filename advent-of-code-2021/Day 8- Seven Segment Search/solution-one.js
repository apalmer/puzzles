const fs = require('fs')

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const outputs = rawData.map(line => line.split("|")[1].trim());

const digits = outputs.map(line => line.split(" ")).flat();

const sizes = digits.map(digit => digit.length);

const uniqueLengths = [2,4,3,7]

uniqueDigits = sizes.filter(size => uniqueLengths.includes(size));

console.log(uniqueDigits.length)