// 타일 채우기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

let t = +input.shift();

while (t-- > 0) {
    const n = +input.shift();
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 5;
    dp[3] = 11;

    for (let i = 4; i <= n; i++) {
        dp[i] = dp[i - 1] + 4 * dp[i - 2];
        for (let j = 4; i - j >= 0; j += 2) {
            dp[i] += 3 * dp[i - j];
        }
        for (let j = 3; i - j >= 0; j += 2) {
            dp[i] += 2 * dp[i - j];
        }
    }

    console.log(dp[n]);

    // dp[i] = dp[i-1] + 4 * dp[i-2] + 2 * dp[i-3] + 3 * dp[i-4] + 3 * dp[i-6];
}
