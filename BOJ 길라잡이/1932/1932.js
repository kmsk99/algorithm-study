// 정수 삼각형

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input.slice(1).map((v) => v.split(' ').map((x) => +x));

const dp = new Array(n).fill(0);

for (let i = 0; i < n; i++) {
    for (let j = i; j >= 0; j--) {
        if (j - 1 < 0) {
            dp[j] = dp[j] + a[i][j];
        } else {
            dp[j] = Math.max(dp[j - 1] + a[i][j], dp[j] + a[i][j]);
        }
    }
}

console.log(Math.max(...dp));
