const fs = require('fs')

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const polymer = rawData[0].split('');
const replacements = {};

rawData.forEach(element => {
    let repParser = /(.{2}) -> (.{1})/;
    let m = element.match(repParser);
    if (m) {
        let pair = m[1];
        let insertChar = m[2];
        replacements[pair] = insertChar;
    }
});

function polymerize(polymer, replacements){

    const newPolymer = [];
    for (let i = 0; i < polymer.length - 1; i++) {
    
        newPolymer.push(polymer[i]);
    
        const pair = polymer[i]+polymer[i+1];
    
        const replacement = replacements[pair];
        if(replacement){
            newPolymer.push(replacement);
        }   
    }
    newPolymer.push(polymer[polymer.length -1]);

    return newPolymer;
}

function summarize(array){
    let counts = {}
    array.forEach(element => {
        let count = counts[element];
        if(!count){
            count = 0;
        }
        counts[element] = count + 1;
    });
    return counts;
}

function getMinMax(array){
    
    let counts = summarize(array);
    let keys = Object.keys(counts);
    let minKey = keys[0];
    let min = counts[keys[0]];
    let maxKey = keys[0];
    let max = counts[keys[0]];

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const count = counts[key];
        if(count < min ){
            min = count;
            minKey = key;
        } 
        if(count > max){
            max = count;
            maxKey = key;
        }
    }

    return {min: min, max: max};
}

let iterations = 10
let newPolymer = polymer;

for (let i = 1; i <= iterations; i++) {
    newPolymer = polymerize(newPolymer,replacements);
}

let {min, max} = getMinMax(newPolymer);

let len = newPolymer.length - 1;
console.log(len);
console.log(max - min);