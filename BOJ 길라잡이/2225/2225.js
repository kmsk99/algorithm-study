// 합분해

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [n, k] = input.map((x) => +x);

const dp = new Array(k).fill(null).map(() => new Array(n + 1).fill(1));

for (let i = 1; i < k; i++) {
    for (let j = 1; j < n + 1; j++) {
        dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1000000000;
    }
}

console.log(dp[k - 1][n]);
