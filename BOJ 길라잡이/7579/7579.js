// 앱

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input
    .shift()
    .split(' ')
    .map((x) => +x);
const b = input
    .shift()
    .split(' ')
    .map((x) => +x);
const c = [];
const dp = new Array(10001).fill(0);

for (let i = 0; i < n; i++) {
    c[i] = [a[i], b[i]];
}

c.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

for (let i = 0; i < n; i++) {
    for (let j = 10000; j >= 0; j--) {
        dp[j] = Math.max(dp[j], j - c[i][1] >= 0 && dp[j - c[i][1]] + c[i][0]);
    }
}

let result = 0;
for (let i = 0; i < 10001; i++) {
    if (dp[i] >= m) {
        result = i;
        break;
    }
}

console.log(result);
