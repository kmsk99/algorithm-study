// 01타일

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = +fs.readFileSync(PATH).toString().trim();

const dp = new Array(input + 1).fill(0);

dp[1] = 1;
dp[2] = 2;
for (let i = 3; i <= input; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 15746;
}

console.log(dp[input]);
