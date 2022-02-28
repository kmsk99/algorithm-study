// 2×n 타일링

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = +fs.readFileSync(PATH).toString().trim();

const dp = new Array(input).fill(0);
dp[0] = 1;
dp[1] = 2;

for (let i = 2; i < input; i++) {
    dp[i] = (dp[i - 2] + dp[i - 1]) % 10007;
}

console.log(dp[input - 1]);
