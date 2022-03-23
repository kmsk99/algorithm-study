// 부분합

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, s] = input
    .shift()
    .split(' ')
    .map((x) => +x);

const a = input
    .shift()
    .split(' ')
    .map((x) => +x);

const dp = new Array(n).fill(0);

let pt = 0;
let min = Infinity;

dp[0] = a[0];
if (dp[0] >= s) min = 1;
else {
    for (let i = 1; i < n; i++) {
        dp[i] = dp[i - 1] + a[i];
        while (dp[i] >= s) {
            min = Math.min(min, i - pt + 1);
            dp[i] -= a[pt];
            pt++;
        }
    }
}

const result = min === Infinity ? 0 : min;

console.log(result);
