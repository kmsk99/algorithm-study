// 데스노트

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input.map((x) => +x);
const dp = new Array(1001).fill(null).map(() => new Array(1001));

const solve = (idx = 0, len = 0) => {
    if (idx >= n) {
        return 0;
    }

    if (dp[idx][len] !== undefined) {
        return dp[idx][len];
    }

    dp[idx][len] = (m - len + 1) * (m - len + 1) + solve(idx + 1, a[idx] + 1);
    if (len + a[idx] <= m) {
        dp[idx][len] = Math.min(dp[idx][len], solve(idx + 1, len + a[idx] + 1));
    }
    return dp[idx][len];
};

console.log(solve());
