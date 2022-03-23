// 우수 마을

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = [
    null,
    ...input
        .shift()
        .split(' ')
        .map((x) => +x),
];
const b = input.map((v) => v.split(' ').map((x) => +x));
const c = new Array(n + 1).fill(null).map(() => []);
const visit = new Array(n + 1).fill(false);
const dp = new Array(n + 1).fill(null).map(() => new Array(2).fill(-1));

for (let i = 0; i < n - 1; i++) {
    c[b[i][0]].push(b[i][1]);
    c[b[i][1]].push(b[i][0]);
}

const dfs = (node = 1) => {
    dp[node][0] = 0;
    dp[node][1] = a[node];
    visit[node] = true;

    for (const next of c[node]) {
        if (visit[next]) continue;
        dfs(next);
        dp[node][1] += dp[next][0];
        dp[node][0] += Math.max(dp[next][0], dp[next][1]);
    }
};

dfs();
console.log(Math.max(...dp[1]));
