// 행렬 곱셈 순서

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = [null, ...input.map((v) => v.split(' ').map((x) => +x))];
const dp = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) {
    for (let j = 1; i + j <= n; j++) {
        dp[j][j + i] = Infinity;
        for (let k = j; k < i + j; k++) {
            dp[j][j + i] = Math.min(
                dp[j][j + i],
                dp[j][k] + dp[k + 1][i + j] + a[j][0] * a[k][1] * a[i + j][1]
            );
        }
    }
}

console.log(dp[1][n]);
