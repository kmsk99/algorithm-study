// 역사

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input.slice(0, m).map((v) => v.split(' ').map((x) => +x));
const s = +input[m];
const b = input.slice(m + 1).map((v) => v.split(' ').map((x) => +x));
const dp = new Array(n).fill(null).map(() => new Array(n).fill(0));

for (let i = 0; i < n; i++) {
    dp[i][i] = 0;
}

for (let i = 0; i < m; i++) {
    const [h, l] = a[i];
    dp[h - 1][l - 1] = -1;
    dp[l - 1][h - 1] = 1;
}

for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (dp[i][k] === -1 && dp[k][j] === -1) {
                dp[i][j] = -1;
            } else if (dp[i][k] === 1 && dp[k][j] === 1) {
                dp[i][j] = 1;
            }
        }
    }
}

const result = [];

for (let i = 0; i < s; i++) {
    result.push(dp[b[i][0] - 1][b[i][1] - 1]);
}

console.log(result.join('\n'));
