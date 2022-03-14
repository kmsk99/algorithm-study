// 케빈 베이컨의 6단계 법칙

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input.map((v) => v.split(' ').map((x) => +x));
const dp = new Array(n + 1)
    .fill(null)
    .map(() => new Array(n + 1).fill(Infinity));

for (let i = 1; i <= n; i++) {
    dp[i][i] = 0;
}

for (let i = 0; i < m; i++) {
    const [x, y] = a[i];
    dp[x][y] = 1;
    dp[y][x] = 1;
}

for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (dp[i][j] < dp[i][k] + dp[k][j]) continue;
            dp[i][j] = dp[i][k] + dp[k][j];
        }
    }
}

const bacon = (row) => {
    return dp[row].slice(1).reduce((acc, cur) => acc + cur, 0);
};

let min = Infinity;
let result = 0;
for (let i = 1; i <= n; i++) {
    const baked = bacon(i);
    if (min > baked) {
        min = baked;
        result = i;
    }
}
console.log(result);
