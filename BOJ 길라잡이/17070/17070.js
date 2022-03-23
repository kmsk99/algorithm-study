// 파이프 옮기기 1

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));
const dp = new Array(n)
    .fill(null)
    .map(() => new Array(n).fill(null).map(() => new Array(3).fill(0)));
dp[0][1][0] = 1;

for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
        for (let k = 0; k < 3; k++) {
            if (dp[y][x][k] === 0) continue;
            if (x + 1 < n && a[y][x + 1] === 0 && k !== 2) {
                dp[y][x + 1][0] += dp[y][x][k];
            }
            if (y + 1 < n && a[y + 1][x] === 0 && k !== 0) {
                dp[y + 1][x][2] += dp[y][x][k];
            }
            if (
                y + 1 < n &&
                x + 1 < n &&
                a[y][x + 1] === 0 &&
                a[y + 1][x] === 0 &&
                a[y + 1][x + 1] === 0
            ) {
                dp[y + 1][x + 1][1] += dp[y][x][k];
            }
        }
    }
}

console.log(dp[n - 1][n - 1][0] + dp[n - 1][n - 1][1] + dp[n - 1][n - 1][2]);
