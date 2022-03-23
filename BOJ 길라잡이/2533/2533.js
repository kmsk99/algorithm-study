// 사회망 서비스(SNS)

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const b = new Array(n + 1).fill(null).map(() => []);
const dp = new Array(n + 1).fill(null).map(() => new Array(2).fill(-1));

input
    .map((v) => v.split(' ').map((x) => +x))
    .forEach((v) => {
        b[v[1]].push(v[0]);
        b[v[0]].push(v[1]);
    });

const dfs = (idx) => {
    dp[idx][0] = 0;
    dp[idx][1] = 1;

    for (const child of b[idx]) {
        if (dp[child][0] !== -1 || dp[child][1] !== -1) continue;
        dfs(child);
        dp[idx][0] += dp[child][1];
        dp[idx][1] += Math.min(dp[child][0], dp[child][1]);
    }
};

dfs(1);

console.log(Math.min(...dp[1]));
