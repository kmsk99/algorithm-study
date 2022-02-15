// 동전 2

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, k] = input[0].split(' ').map((x) => +x);
const coins = [0, ...input.slice(1).map((x) => +x)].sort((a, b) => a - b);

const map = new Array(k + 1).fill(Infinity);
map[0] = 0;

for (let y = 1; y < n + 1; y++) {
    for (let x = 1; x < k + 1; x++) {
        if (x - coins[y] < 0) continue;
        map[x] = Math.min(map[x], map[x - coins[y]] + 1);
    }
}

let result = map[k];

if (result === Infinity) result = -1;

console.log(result);
