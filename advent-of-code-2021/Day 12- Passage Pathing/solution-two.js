const fs = require('fs');

function parseTransition(line) {
    let from, to;
    [from, to] = line.split('-');
    return { from: from, to: to };
}

function pathfinder(state, curr) {

    if(curr === 'end'){
        return [['end']];
    }

    let valid = state.rules.every((r) => { 
        let ruleValid = r(state, curr); 
        return ruleValid;
    });

    if(!valid){
        return [];
    }

    let forwardOptions = transitions
        .filter(t => t.from === curr);
    
    let reverseOptions = transitions
        .filter(t => t.to === curr)
        .map(t => { 
            return {
                to:t.from, 
                from:t.to
            }
        });
    
    let options = forwardOptions.concat(reverseOptions);

    let pathsToEnd = []
    for (let i = 0; i < options.length; i++) {
        const opt = options[i];

        let {...currState } = state;
        currState.path = currState.path.concat([curr]); 

        let childPaths = pathfinder(currState, opt.to).filter(x => x && x.length > 0);

        if (childPaths && childPaths.length) {
            pathsToEnd = pathsToEnd.concat(childPaths);
        }
    }

    if (pathsToEnd && pathsToEnd.length) {
        pathsToEnd = pathsToEnd.map(pathToEnd => {
            pathToEnd.unshift(curr); 
            return pathToEnd;
        });
    }

    return pathsToEnd;
}

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

const transitions = rawData.map(parseTransition);

const rules = [
    (state, curr) => {
        return state.path.length == 0 || curr !== 'start';
    },
    (state, curr) => { 
        function isLowerCase(str){
            return str.toLowerCase() != str.toUpperCase() && str == str.toLowerCase();
        }  

        function getCounts(items){
            let obj = items.reduce((counts, key) =>{
                counts[key] = ++counts[key] || 1;
                return counts;
              }, {});
            
            let arr = Object.keys(obj).map(key => {return { 'key': key, 'count': obj[key] }});
            return arr;
        }

        let cLowerCase = isLowerCase(curr);
        if(cLowerCase) {
            if (!state.path.includes(curr)){ 
                return true; 
            }

            let lcs = state.path.filter(isLowerCase);
            let big = getCounts(lcs).find(x => x.count > 1);
            return !big;
        }
        
        return true; 
    }
];

let initial = { path : [], paths : [], rules: rules };
let curr = 'start';
let results = pathfinder(initial, curr);
console.log(results.length);