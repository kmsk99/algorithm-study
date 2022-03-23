// 팰린드롬?

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input
    .shift()
    .split(' ')
    .map((x) => +x);
const m = +input.shift();
const b = input.map((v) => v.split(' ').map((x) => +x));
const dp = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(-1));

const dfs = (s, e) => {
    if (dp[s][e] !== -1) {
        return dp[s][e];
    }

    if (s === e) {
        return (dp[s][e] = 1);
    }

    if (a[s] === a[e]) {
        if (s + 1 === e) {
            return (dp[s][e] = 1);
        }
        if (dfs(s + 1, e - 1) === 1) {
            return (dp[s][e] = 1);
        }
    }

    return (dp[s][e] = 0);
};

const result = [];

for (let i = 0; i < m; i++) {
    result.push(dfs(b[i][0] - 1, b[i][1] - 1));
}

console.log(result.join('\n'));
