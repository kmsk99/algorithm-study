// 평범한 배낭

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, k] = input
    .shift()
    .split(' ')
    .map((x) => +x);

const a = input
    .map((v) => v.split(' ').map((x) => +x))
    .sort((a, b) => a[0] - b[0] || b[1] - a[1]);

const dp = new Array(n).fill(null).map(() => new Array(k + 1).fill(0));

for (let i = a[0][0]; i <= k; i++) {
    dp[0][i] = a[0][1];
}

for (let i = 1; i < n; i++) {
    const [w, v] = a[i];
    for (let j = 1; j <= k; j++) {
        if (j - w >= 0) {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + v);
        } else {
            dp[i][j] = dp[i - 1][j];
        }
    }
}

console.log(dp[n - 1][k]);
