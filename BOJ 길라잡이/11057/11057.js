// 오르막 수

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = +fs.readFileSync(PATH).toString().trim();

const dp = new Array(input + 2).fill(null).map(() => new Array(10).fill(1));

for (let i = 2; i < input + 2; i++) {
    for (let j = 1; j < 10; j++) {
        dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 10007;
    }
}

console.log(dp[input + 1][9]);
