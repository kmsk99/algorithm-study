// 동전 0

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, k] = input[0].split(' ').map((x) => +x);
const a = input
    .slice(1)
    .map((x) => +x)
    .reverse();
let cnt = 0;
let idx = 0;
let change = k;
while (change !== 0) {
    if (change - a[idx] >= 0) {
        cnt++;
        change = change - a[idx];
    } else {
        idx++;
    }
}

console.log(cnt);
