// 파도반 수열

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const t = +input.shift();
const a = input.map((x) => +x);
const dp = new Array(101).fill(0);

dp[1] = 1;
dp[2] = 1;
dp[3] = 1;
dp[4] = 2;
dp[5] = 2;
dp[6] = 3;
dp[7] = 4;
dp[8] = 5;
dp[9] = 7;
dp[10] = 9;

for (let i = 11; i < 101; i++) {
    dp[i] = dp[i - 1] + dp[i - 5];
}

const result = a.map((x) => dp[x]);
console.log(result.join('\n'));
