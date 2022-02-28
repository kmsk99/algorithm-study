// 카드 구매하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input[1].split(' ').map((x) => +x);
const dp = new Array(n + 1).fill(0);

for (let i = 0; i < n; i++) {
    for (let j = 1; j <= n; j++) {
        if (j - i - 1 < 0) continue;
        dp[j] = Math.max(dp[j - i - 1] + a[i], dp[j]);
    }
}

console.log(Math.max(...dp));
