const { generateKeyPairSync } = require('crypto');
const fs = require('fs')

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

function getCharCounts(counts){
    
    let keys = Object.keys(counts);

    let leftCounts = {};
    let rightCounts = {};

    for (let i = 0; i < keys.length; i++) {

        const key = keys[i];
        count = counts[key];
        let left = key[0];
        let right = key[1];
        
        leftCounts[left] = (leftCounts[left] || 0) + count;
        rightCounts[right] = (rightCounts[right] || 0) + count;
    }

    let lefts = Object.keys(leftCounts);
    let rights = Object.keys(rightCounts);
    let chars = new Set(lefts);
    rights.forEach(char => {
        chars.add(char);
    });

    let charCounts = {};
    chars.forEach(char => {
        charCounts[char] = Math.max(leftCounts[char],rightCounts[char]);
    });

    return charCounts;
}

function getMinMax(charCounts){
    
    charKeys = Object.keys(charCounts);
    let minKey = charKeys[0];
    let min = charCounts[charKeys[0]];
    let maxKey = charKeys[0];
    let max = charCounts[charKeys[0]];

    for (let i = 0; i < charKeys.length; i++) {
        const charKey = charKeys[i];
        const charCount = charCounts[charKey];
        if(charCount < min ){
            min = charCount;
            minKey = charKey;
        } 
        if(charCount > max){
            max = charCount;
            maxKey = charKey;
        }
    }

    return {min: min, max: max};
}

function summarize(polymer){
    counts = {};
    for (let i = 0; i < polymer.length-1; i++) {
        const pair = polymer[i] + polymer[i+1];
        let count = (counts[pair] || 0);
        counts[pair] = count + 1
    }
    return counts;
}

function applyStateTransitions(state,transforms){

    let newState = {};
    let pairs = Object.keys(state);
    
    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i];
        
        const replacement = transforms[pair];
        let count = state[pair];
        let left = replacement[0];
        let right = replacement[1];

        newState[left] = (newState[left] || 0) + count;
        newState[right] = (newState[right] || 0) + count;

    }

    return newState;
}

const polymer = rawData[0].split('');
const replacements = {};

rawData.forEach(element => {
    let repParser = /(.)(.) -> (.)/;
    let m = element.match(repParser);
    if (m) {
        let pair = m[1]+m[2];
        let left = m[1]+m[3];
        let right = m[3]+m[2];
        replacements[pair] = [left,right];
    }
});

let iterations = 40;
let pairCounts = summarize(polymer);

for (let i = 1; i <= iterations; i++) {
    pairCounts = applyStateTransitions(pairCounts,replacements);
}

let charCounts = getCharCounts(pairCounts);

let {min, max} = getMinMax(charCounts);

let chars = Object.keys(charCounts);
let len = chars.reduce((acc,char)=> acc + charCounts[char],0);
console.log(len);

console.log(max - min);