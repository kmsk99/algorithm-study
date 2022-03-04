// 가장 큰 정사각형

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input.map((v) => v.split('').map((x) => +x));
const dp = new Array(n).fill(null).map(() => new Array(m).fill(0));
let result = 0;

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (a[i][j] === 0) {
            dp[i][j] = 0;
        } else if (a[i][j] === 1) {
            if (i === 0 || j === 0) {
                dp[i][j] = 1;
            } else {
                dp[i][j] =
                    Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
            }
            if (dp[i][j] > result) {
                result = dp[i][j];
            }
        }
    }
}

console.log(result * result);
