// 1학년

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input
    .shift(' ')
    .split(' ')
    .map((x) => +x);
const dp = new Array(n).fill(null).map(() => new Array(21).fill(0n));
dp[0][a[0]] = 1n;

for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < 21; j++) {
        if (dp[i][j] === 0) continue;
        if (j + a[i + 1] <= 20) {
            dp[i + 1][j + a[i + 1]] += dp[i][j];
        }
        if (j - a[i + 1] >= 0) {
            dp[i + 1][j - a[i + 1]] += dp[i][j];
        }
    }
}

console.log(dp[n - 2][a[n - 1]] + '');
