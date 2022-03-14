// 줄세우기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input.map((x) => +x);
const dp = new Array(n).fill(0);

for (let i = n - 1; i >= 0; i--) {
    dp[i] = 1;
    for (let j = i; j < n; j++) {
        if (a[i] < a[j]) dp[i] = Math.max(dp[j] + 1, dp[i]);
    }
}

const result = n - Math.max(...dp);
console.log(result);
