// 소형기관차

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = [
    0,
    ...input
        .shift()
        .split(' ')
        .map((x) => +x),
];
const k = +input.shift();
const dp1 = [0];
const dp2 = new Array(4).fill(null).map(() => new Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) {
    dp1[i] = dp1[i - 1] + a[i];
}

for (let i = 1; i <= 3; i++) {
    for (let j = 0; j <= n; j++) {
        if (j - k < 0) continue;
        dp2[i][j] = Math.max(
            dp2[i][j - 1],
            dp2[i - 1][j - k] + dp1[j] - dp1[j - k]
        );
    }
}

console.log(dp2[3][n]);
