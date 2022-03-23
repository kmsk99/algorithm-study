// 소형기관차

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input.map((x) => BigInt(x));
const mod = 1000000007n;

const dp = new Array(5001).fill(0n);

dp[0] = 1n;
dp[2] = 1n;

for (let i = 4; i < 5001; i++) {
    for (let j = 2; j <= i; j += 2) {
        dp[i] += dp[i - j] * dp[j - 2];
        dp[i] %= mod;
    }
}

const result = [];

for (let i = 0; i < n; i++) {
    result.push(dp[a[i]]);
}

console.log(result.join('\n'));

// dp[1][j] = dp[0][j-2] * dp[0][2];
// dp[0][j] = dp[0][j-2] + dp[1][j-2];
// dp[0][j] =
