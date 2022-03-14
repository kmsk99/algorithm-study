// 외판원 순회 2

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(test).toString().trim().split('\n');

const n = +input.shift();
const map = input.map((v) => v.split(' ').map((x) => +x));
const dp = new Array(Math.pow(2, n))
    .fill(null)
    .map(() => new Array(n).fill(Infinity));

const dfs = (node = 0, visited = 1) => {
    console.log(node);
    if (visited === (1 << n) - 1) {
        if (map[node][0] === 0) return Infinity;

        return map[node][0];
    }

    if (dp[visited][node] !== Infinity) {
        return dp[visited][node];
    }

    for (let i = 0; i < n; i++) {
        if ((visited & (1 << i)) !== 0 || map[node][i] === 0) continue;
        const next = visited | (1 << i);

        dp[visited][node] = Math.min(
            dp[visited][node],
            dfs(i, next) + map[node][i]
        );
    }

    return dp[visited][node];
};

console.log(dfs());
