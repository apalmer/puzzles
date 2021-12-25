const fs = require('fs')

const rawData = fs.readFileSync('data.txt', 'utf8')
    .toString()
    .split("\r\n");