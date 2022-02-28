// 연속합

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input[1].split(' ').map((x) => +x);
const dp = new Array(n).fill(0);
dp[0] = a[0];

for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 1] + a[i], a[i]);
}

console.log(Math.max(...dp));
