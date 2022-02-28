// 가장 긴 증가하는 부분 수열

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input[1].split(' ').map((x) => +x);
const dp = new Array(n).fill(1);

for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
        if (a[j] < a[i]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
}

console.log(Math.max(...dp));
