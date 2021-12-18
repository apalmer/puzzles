const fs = require('fs')


function scope(state) {

    let { rest, expected, completion, completionCost } = state

    let matches = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    };

    let errCosts = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    };

    let compCosts = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    }

    let curr = rest.shift();

    //if curr is not an open character then its corrupt
    if (!(Object.keys(matches).includes(curr))) {
        errorCost += errCosts[curr]
        throw `Expected ${expected}, but found ${curr} instead. Cost: ${errCosts[curr]}`
    }

    let newExpected = matches[curr];

    while (rest.length > 0) {

        //if next is appropriate closing of curr then remove it and return rest
        if (rest[0] === matches[curr]) {
            rest.shift();
            return { rest: rest, expected: newExpected, completion: completion, completionCost: completionCost };
        }

        //otherwise make a new scope and let it process till it returns a new rest
        ({ rest, expected, completion, completionCost } = scope({ rest: rest, expected: newExpected, completion: completion, completionCost: completionCost }));
    }

    //ended before scope was completed
    completion += newExpected
    completionCost = (5 * completionCost) + compCosts[newExpected];

    return { rest: rest, expected: newExpected, completion: completion, completionCost: completionCost };
}

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

errorCost = 0;

let completionCosts = []

rawData.forEach(line => {

    try {
        let tokens = line.split('');
        let results = scope({ rest: tokens, expected: null, completion: "", completionCost: 0 });
        console.log(results)
        if(results.completionCost > 0){
            completionCosts.push(results.completionCost);
        }
        else{
            console.log("valid line {}")
        }
    }
    catch (error) {
        console.log(error)
    }
});

completionCosts.sort((a,b) => a - b);

if(completionCosts && completionCosts.length > 0){
    console.log(`median completion cost: ${completionCosts[(completionCosts.length - 1)/2]}`)
}

console.log(`total error costs: ${errorCost}`)
