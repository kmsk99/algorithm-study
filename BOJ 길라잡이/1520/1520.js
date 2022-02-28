// 내리막 길

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [M, N] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input.map((v) => v.split(' ').map((x) => +x));
const dp = new Array(M).fill(null).map(() => new Array(N).fill(-1n));
const dir = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
];

const dfs = (x, y) => {
    if (x === N - 1 && y === M - 1) {
        return 1n;
    } else if (dp[y][x] === -1n) {
        dp[y][x] = 0n;
        for (let i = 0; i < 4; i++) {
            const [nx, ny] = [x + dir[0][i], y + dir[1][i]];
            if (nx < 0 || ny < 0 || nx >= N || ny >= M || a[y][x] <= a[ny][nx])
                continue;
            dp[y][x] += dfs(nx, ny);
        }
    }

    return dp[y][x];
};

dfs(0, 0);

console.log(String(dp[0][0]));
