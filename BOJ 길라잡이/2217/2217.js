// 로프

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input.slice(1).map((x) => +x);
const dp = new Array(n + 1).fill(0);
a.sort((a, b) => b - a);

for (let i = 0; i < n; i++) {
    dp[i] = a[i] * (i + 1);
}

console.log(Math.max(...dp));
