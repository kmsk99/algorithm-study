// 이항 계수 2

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [N, K] = input.map((x) => +x);
const dp = new Array(1001).fill(null).map(() => new Array(1001).fill(0));
// n!/k!(n-k)!
const biominal = (n, k) => {
    if (k === 0 || k === n) {
        return 1;
    }
    if (dp[n][k] === 0) {
        dp[n][k] = (biominal(n - 1, k - 1) + biominal(n - 1, k)) % 10007;
    }

    return dp[n][k];
};

console.log(biominal(N, K));
