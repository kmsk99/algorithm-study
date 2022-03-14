// 타임머신

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
const dp = new Array(n + 1).fill(Infinity);

dp[1] = 0;
for (let j = 0; j < n - 1; j++) {
    for (let i = 0; i < m; i++) {
        const [from, to, cost] = a[i];
        dp[to] = Math.min(dp[from] + cost, dp[to]);
    }
}

let result;

for (let i = 0; i < m; i++) {
    const [from, to, cost] = a[i];
    if (dp[to] !== Math.min(dp[from] + cost, dp[to])) {
        result = -1;
    }
}

if (result !== -1) {
    result = dp
        .slice(2)
        .map((x) => (x === Infinity ? -1 : x))
        .join('\n');
}

console.log(result);
