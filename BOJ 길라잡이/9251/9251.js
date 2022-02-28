// LCS

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [a, b] = input;

const dp = new Array(a.length + 1)
    .fill(null)
    .map(() => new Array(b.length + 1).fill(0));

for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
        if (a[i] === b[j]) {
            dp[i + 1][j + 1] = dp[i][j] + 1;
        } else {
            dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
        }
    }
}

const result = dp[a.length][b.length];
console.log(result);
