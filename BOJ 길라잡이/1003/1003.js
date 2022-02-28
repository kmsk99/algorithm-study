// 피보나치 함수

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const t = +input[0];
const ns = input.slice(1).map((x) => +x);
const result = [];

const fibonacci = (n) => {
    const dp = new Array(n + 1).fill(0);
    dp[0] = [1, 0];
    dp[1] = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = [dp[i - 2][0] + dp[i - 1][0], dp[i - 2][1] + dp[i - 1][1]];
    }

    return dp[n];
};

for (let i = 0; i < t; i++) {
    result.push(fibonacci(ns[i]));
}

console.log(result.map((x) => x.join(' ')).join('\n'));
