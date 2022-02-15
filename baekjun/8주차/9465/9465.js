// 스티커

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');
const number = +input[0];
const stickers = [];
for (let i = 0; i < number; i++) {
    const size = +input[3 * i + 1];
    const array = [[0], [0]];
    array[0].push(...input[3 * i + 2].split(' ').map((x) => +x));
    array[1].push(...input[3 * i + 3].split(' ').map((x) => +x));
    stickers.push([size, array]);
}
const maxValue = new Array(number).fill(0);

function tear(size, array) {
    const memo = [new Array(size + 1), new Array(size + 1)];
    memo[0][0] = 0;
    memo[1][0] = 0;
    memo[0][1] = array[0][1];
    memo[1][1] = array[1][1];
    for (let i = 2; i <= size; i++) {
        memo[0][i] = Math.max(memo[1][i - 1], memo[1][i - 2]) + array[0][i];
        memo[1][i] = Math.max(memo[0][i - 1], memo[0][i - 2]) + array[1][i];
    }

    return Math.max(memo[0][size], memo[1][size]);
}

for (let i = 0; i < number; i++) {
    maxValue[i] = tear(stickers[i][0], stickers[i][1]);
}

console.log(maxValue.join(' '));
