// RGB거리

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input.slice(1).map((v) => v.split(' ').map((x) => +x));

const dp = new Array(n).fill(null).map(() => new Array(3).fill(0));
dp[0][0] = a[0][0];
dp[0][1] = a[0][1];
dp[0][2] = a[0][2];

for (let i = 1; i < n; i++) {
    dp[i][0] = Math.min(dp[i - 1][1] + a[i][0], dp[i - 1][2] + a[i][0]);
    dp[i][1] = Math.min(dp[i - 1][0] + a[i][1], dp[i - 1][2] + a[i][1]);
    dp[i][2] = Math.min(dp[i - 1][0] + a[i][2], dp[i - 1][1] + a[i][2]);
}

console.log(Math.min(...dp[n - 1]));
