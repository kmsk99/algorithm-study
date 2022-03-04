// 동물원

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = +fs.readFileSync(PATH).toString().trim();

const dp = new Array(input + 1).fill(null).map(() => new Array(3).fill(0));

dp[0][0] = 1;
dp[0][1] = 1;
dp[0][2] = 1;

for (let i = 1; i <= input; i++) {
    dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % 9901;
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % 9901;
    dp[i][2] = (dp[i - 1][0] + dp[i - 1][1]) % 9901;
}

console.log(dp[input][0]);
