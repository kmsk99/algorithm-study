// Acka

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [s, x, y, z] = input.map((x) => +x);
const dp = new Array(s + 1)
    .fill(null)
    .map(() =>
        new Array(x + 1)
            .fill(null)
            .map(() =>
                new Array(y + 1)
                    .fill(null)
                    .map(() => new Array(z + 1).fill(-1n))
            )
    );

const dfs = (s, x, y, z) => {
    if (s === 0 && x === 0 && y === 0 && z === 0) {
        return 1n;
    }

    if (s === 0 && (x > 0 || y > 0 || z > 0)) {
        return 0n;
    }

    if (dp[s][x][y][z] !== -1n) {
        return dp[s][x][y][z];
    }
    dp[s][x][y][z] = 0n;

    if (s > 0) {
        if (x > 0 && y > 0 && z > 0)
            dp[s][x][y][z] += dfs(s - 1, x - 1, y - 1, z - 1);
        if (x > 0 && y > 0) dp[s][x][y][z] += dfs(s - 1, x - 1, y - 1, z);
        if (x > 0 && z > 0) dp[s][x][y][z] += dfs(s - 1, x - 1, y, z - 1);
        if (y > 0 && z > 0) dp[s][x][y][z] += dfs(s - 1, x, y - 1, z - 1);
        if (x > 0) dp[s][x][y][z] += dfs(s - 1, x - 1, y, z);
        if (y > 0) dp[s][x][y][z] += dfs(s - 1, x, y - 1, z);
        if (z > 0) dp[s][x][y][z] += dfs(s - 1, x, y, z - 1);
    }

    dp[s][x][y][z] %= 1000000007n;

    return dp[s][x][y][z];
};

console.log(dfs(s, x, y, z) + '');
