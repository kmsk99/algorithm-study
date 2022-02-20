// 소수 구하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [m, n] = input.map((x) => +x);
const result = [];

const dp = new Array(n + 1).fill(true);
dp[1] = false;

for (let i = 2; i <= Math.sqrt(n); i++) {
    if (!dp[i]) continue;
    for (let j = 2 * i; j <= n; j += i) {
        dp[j] = false;
    }
}

for (let i = m; i <= n; i++) {
    if (!dp[i]) continue;
    result.push(i);
}
console.log(result.join('\n'));
