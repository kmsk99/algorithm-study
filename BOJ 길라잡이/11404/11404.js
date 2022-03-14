// 플로이드

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const m = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));
const dp = new Array(n).fill(null).map(() => new Array(n).fill(Infinity));

for (let i = 0; i < n; i++) {
    dp[i][i] = 0;
}

for (let i = 0; i < m; i++) {
    const [from, to, cost] = a[i];
    dp[from - 1][to - 1] = Math.min(cost, dp[from - 1][to - 1]);
}

for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j]);
        }
    }
}

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (dp[i][j] === Infinity) {
            dp[i][j] = 0;
        }
    }
}

const result = dp.map((v) => v.join(' ')).join('\n');

console.log(result);
