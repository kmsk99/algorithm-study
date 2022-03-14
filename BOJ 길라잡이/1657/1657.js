// 두부장수 장홍준

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const hash = { A: 0, B: 1, C: 2, D: 3, F: 4 };
const a = input.map((v) => v.split('').map((x) => hash[x]));
const cost = `10 8 7 5 1
8 6 4 3 1
7 4 3 2 1
5 3 2 2 1
1 1 1 1 0`
    .split('\n')
    .map((v) => v.split(' ').map((x) => +x));
const dp = new Array(n * m).fill(null).map(() => new Array(1 << m).fill(-1));

const dfs = (u = 0, s = 0) => {
    if (u >= n * m) {
        if (u === n * m && s === 0) return 0;
        return -Infinity;
    }

    if (dp[u][s] !== -1) dp[u][s];
    let ans = dfs(u + 1, (s << 1) & ((1 << m) - 1));
    const x = u % m;
    const y = Math.floor(u / m);

    if (!(s & (1 << (m - 1)))) {
        if (!(s & (1 << (m - 2))) && x < m - 1) {
            ans = Math.max(
                ans,
                cost[a[y][x]][a[y][x + 1]] +
                    dfs(u + 2, (s << 2) & ((1 << m) - 1))
            );
        }
        if (y < n - 1) {
            ans = Math.max(
                ans,
                cost[a[y][x]][a[y + 1][x]] +
                    dfs(u + 1, ((s << 1) + 1) & ((1 << m) - 1))
            );
        }
    }
    return (dp[u][s] = ans);
};

console.log(dfs());
