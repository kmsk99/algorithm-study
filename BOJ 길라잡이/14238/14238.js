// 출근 기록

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim();

const count = [0, 0, 0];
for (let i = 0; i < input.length; i++) {
    if (input[i] === 'A') count[0]++;
    if (input[i] === 'B') count[1]++;
    if (input[i] === 'C') count[2]++;
}

const dp = new Array(count[0] + 1)
    .fill(null)
    .map(() =>
        new Array(count[1] + 1)
            .fill(null)
            .map(() =>
                new Array(count[2] + 1)
                    .fill(null)
                    .map(() =>
                        new Array(3).fill(null).map(() => new Array(3).fill(-1))
                    )
            )
    );

const dfs = (x = count[0], y = count[1], z = count[2], p1 = 0, p2 = 0) => {
    if (dp[x][y][z][p1][p2] === -1) {
        dp[x][y][z][p1][p2] = '';
    }

    if (x > 0 && dp[x - 1][y][z][0][p1] === -1) {
        dp[x - 1][y][z][0][p1] = 'A' + dp[x][y][z][p1][p2];
        dfs(x - 1, y, z, 0, p1);
    }
    if (y > 0 && p1 !== 1 && dp[x][y - 1][z][1][p1] === -1) {
        dp[x][y - 1][z][1][p1] = 'B' + dp[x][y][z][p1][p2];
        dfs(x, y - 1, z, 1, p1);
    }
    if (z > 0 && p1 !== 2 && p2 !== 2 && dp[x][y][z - 1][2][p1] === -1) {
        dp[x][y][z - 1][2][p1] = 'C' + dp[x][y][z][p1][p2];
        dfs(x, y, z - 1, 2, p1);
    }

    return -1;
};

dfs();

let result = -1;

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (dp[0][0][0][i][j] !== -1) {
            result = dp[0][0][0][i][j];
            break;
        }
    }
}

console.log(result);
