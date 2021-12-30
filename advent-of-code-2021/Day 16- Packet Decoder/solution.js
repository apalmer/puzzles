const fs = require('fs')

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n")

function getTape(str) {

    return {
        get: (index, count) => {
            if (!count) {
                count = 1;
            }
            let bucket = Math.floor(index / 4);
            let offset = index % 4;
            let buckets = Math.ceil((count + offset) / 4);
            let hex = str.substring(bucket, bucket + buckets);
            if (!hex) {
                return;
            }
            let num = parseInt(hex, 16);
            let bin = num.toString(2).padStart(buckets * 4, '0');
            let trimmed = bin.substring(offset, offset + count);
            let rep = parseInt(trimmed, 2);

            return rep;
        }
    }
}

function packet(state) {
    let version = state.tape.get(state.position, 3);
    state.position += 3;

    let type = state.tape.get(state.position, 3);
    state.position += 3;

    state.type = type;

    state.versionSum += version;

    if (type === 4) {
        state = packetPayloadLiteral(state);
    }
    else {
        state = packetPayloadOperator(state);
    }

    return state;
}

function packetPayloadLiteral(state) {

    let data = [];
    let last = false;
    while (!last) {
        last = !state.tape.get(state.position);
        data.push(state.tape.get(state.position + 1, 4));
        state.position += 5;
    }

    let datum = data.map(i => i.toString(2).padStart(4, '0')).join('');
    state.value = parseInt(datum, 2);

    return state;
}

function packetPayloadOperator(state) {

    let type = state.type;

    let lengthType = state.tape.get(state.position, 1);
    state.position += 1;
    
    let endBits = 0;
    let lenPkt = 0;
    if (lengthType === 0) {
        let lenBits = state.tape.get(state.position, 15);
        state.position += 15;
        endBits = state.position + lenBits;
    }
    else if (lengthType === 1) {
        lenPkt = state.tape.get(state.position, 11);
        state.position += 11;
    }
    let packets = 0;
    let values = [];
    while (state.position < endBits || packets < lenPkt) {
        packets++;
        state = packet(state);
        values.push(state.value);
    }

    let operators = {
        0: (vals) => { return vals.reduce((accum, curr) => { return accum + curr; }, 0) },
        1: (vals) => { return vals.reduce((accum, curr) => { return accum * curr; }, 1) },
        2: (vals) => { return Math.min(...values) },
        3: (vals) => { return Math.max(...values) },
        5: (vals) => { return values[0] > values[1] ? 1 : 0 },
        6: (vals) => { return values[0] < values[1] ? 1 : 0 },
        7: (vals) => { return values[0] === values[1] ? 1 : 0 },
    }

    let operator = operators[type];

    state.value = operator(values); 

    return state;
}

let tape = getTape(rawData[0]);

let buffer = []
let index = 0;
let next = tape.get(0);

while (next || next === 0) {
    buffer.push(next);
    index++;
    next = tape.get(index);
}

console.log(buffer.join(''));

let state = {
    versionSum: 0,
    position: 0,
    tape: tape,
    value: null,
    type: null
};

console.log(packet(state));

// let state = {
//     tape: getTape(getBuffer(rawData[0])),
//     position: 0
// };