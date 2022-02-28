// 포도주 시식

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input.slice(1).map((x) => +x);
const dp = new Array(n).fill(0);
dp[0] = a[0];
dp[1] = a[0] + a[1];
dp[2] = Math.max(a[0] + a[2], a[1] + a[2], dp[1]);

for (let i = 3; i < n; i++) {
    dp[i] = Math.max(a[i] + a[i - 1] + dp[i - 3], a[i] + dp[i - 2], dp[i - 1]);
}

if (n === 1) {
    console.log(dp[0]);
} else if (n === 2) {
    console.log(dp[1]);
} else {
    console.log(Math.max(...dp));
}
