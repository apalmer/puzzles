const fs = require('fs')

function sortData(data){
    return data.split('').sort().join('');
}

function formatData(line){
    row = line.split("|");
    inputs = row[0].trim().split(" ").map(sortData);
    outputs = row[1].trim().split(" ").map(sortData);

    return {
        inputs: inputs,
        outputs: outputs
    }
}

function contains(container, child){
    
    let containerChars = container.split('');

    return child.split('').every(char => containerChars.includes(char));
}

function getDecoder(data){
    let one = data.find(d => d.length == 2);
    let four = data.find(d => d.length == 4);
    let seven = data.find(d => d.length == 3);
    let eight = data.find(d => d.length == 7);
    let three = data.find(d => d.length == 5 && contains(d, one));
    let six = data.find(d => d.length == 6 && !(contains(d, one)));
    let five = data.find(d => d.length == 5 && contains(six, d));
    let two = data.find(d => d.length == 5 && !(contains(six, d)) && !(contains(d,one)));
    let nine = data.find(d => d.length == 6 && contains(d, one) && contains(d, five));
    let zero = data.find(d => d.length == 6 && contains(d, one) && !(contains(d, five)));

    let key = {};
    key[zero] = '0';
    key[one] = '1';
    key[two] = '2';
    key[three] = '3';
    key[four] = '4';
    key[five] = '5';
    key[six] = '6';
    key[seven] = '7';
    key[eight] = '8';
    key[nine] = '9';

    return key;
}

function decode(decoder, outputs){
    let chars = outputs.map(digit => decoder[digit]);
    let str = chars.join('');
    return parseInt(str);
}

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const data = rawData.map(formatData);

let values = data.map(d => {
    let decoder = getDecoder(d.inputs);
    let value = decode(decoder,d.outputs);
    return value;
})

let sum = values.reduce((x,acc) => x + acc);

console.log(sum);