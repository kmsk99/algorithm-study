// 주유소

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const d = input
    .shift()
    .split(' ')
    .map((x) => BigInt(x));
const a = input
    .shift()
    .split(' ')
    .map((x) => BigInt(x));

const dp = new Array(n);
const cost = new Array(n - 1);
dp[0] = a[0];

for (let i = 1; i < n; i++) {
    if (a[i] > dp[i - 1]) {
        dp[i] = dp[i - 1];
    } else {
        dp[i] = a[i];
    }
}

cost[0] = dp[0] * d[0];
for (let i = 1; i < n - 1; i++) {
    cost[i] = dp[i] * d[i] + cost[i - 1];
}

console.log(String(cost[n - 2]));
