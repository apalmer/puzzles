const fs = require('fs')

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");

if (rawData[rawData.length - 1].trim() != "") {
    rawData.push("");
}

function checkBingo(candidates, cards) {
    var marked = getMarked(candidates, cards);
    var bingo = false;
    var bingoCard = null;
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        for (let y = 0; y < card.length; y++) {
            const row = card[y];
            let xs = row.filter(cell => cell === "X");
            if (row.length == xs.length) {
                bingo = true;
                bingoCard = card;
            }
        }

        for (let x = 0; x < card[0].length; x++) {
            let rowCount = card.length;
            let xCount = 0;
            for (let y = 0; y < rowCount; y++) {
                if (card[y][x] === "X") {
                    xCount++;
                }
            }
            if (xCount == rowCount) {
                bingo = true;
                bingoCard = card;
            }
        }
    }

    return {
        bingo: bingo,
        card: bingo ? bingoCard : null
    }
}

function getMarked(candidates, cards) {
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        for (let y = 0; y < card.length; y++) {
            const row = card[y];
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];
                if (candidates.includes(cell)) {
                    row[x] = "X";
                }
            }
        }
    }
    return cards;
};

function summarize(card) {
    sum = 0;
    for (let y = 0; y < card.length; y++) {
        const row = card[y];
        for (let x = 0; x < row.length; x++) {
            const cell = row[x];
            if (row[x] !== "X") {
                sum += parseInt(cell);
            }
        }
    }
    return sum;
};

let draw = rawData[0].split(',');

let cards = [];

let card;

data = rawData.slice(1);

data.forEach(row => {
    if (row.trim() === "") {
        if (card && card.length > 0) {
            cards.push(card);
        }
        card = [];
    }
    else {
        let cardRow = row.trim().split(' ').filter(i => i);
        card.push(cardRow);
    }
});

let result;
candidates = [];
for (let i = 0; i < draw.length; i++) {
    let candidate = draw[i];
    candidates.push(candidate);
    winner = checkBingo(candidates, cards);
    if (winner.bingo) {
        let sum = summarize(winner.card);
        result = sum * candidate;
    }
}

console.log(result)