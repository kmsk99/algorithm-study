// 쉬운 계단 수

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = +fs.readFileSync(PATH).toString().trim();

const dp = new Array(input).fill(null).map(() => new Array(10).fill(0));
dp[0].forEach((_, idx) => (dp[0][idx] = 1));
dp[0][0] = 0;

for (let i = 1; i < input; i++) {
    for (let j = 0; j < 10; j++) {
        if (j !== 0) {
            dp[i][j] += dp[i - 1][j - 1];
        }
        if (j !== 9) {
            dp[i][j] += dp[i - 1][j + 1];
        }
        dp[i][j] %= 1000000000;
    }
}

console.log(dp[input - 1].reduce((acc, cur) => acc + cur, 0) % 1000000000);
