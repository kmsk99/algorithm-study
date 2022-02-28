// 점프

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));
const dp = new Array(n).fill(null).map(() => new Array(n).fill(0n));
dp[0][0] = 1n;

for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
        if (dp[y][x] === 0 || (y === n - 1 && x === n - 1)) continue;
        const distance = a[y][x];
        const ny = distance + y;
        const nx = distance + x;
        if (ny < n) dp[ny][x] += dp[y][x];
        if (nx < n) dp[y][nx] += dp[y][x];
    }
}

console.log(String(dp[n - 1][n - 1]));
