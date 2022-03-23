// 2048 (Easy)

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(test).toString().trim();

const [n, k] = input.split(' ').map((x) => +x);

const dp = new Array(k + 1)
    .fill(null)
    .map(() =>
        new Array(n + 1)
            .fill(null)
            .map(() =>
                new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(-1))
            )
    );

const dfs = (n, a = 0, b = 0, c = 0, sum = 0) => {
    if (sum > k) return (dp[sum][a][b][c] = -1);

    if (n === 0 && sum === k) return (dp[sum][a][b][c] = '');

    if (n === 0 && sum !== k) return (dp[sum][a][b][c] = -1);

    if (dp[sum][a][b][c] !== -1) return dp[sum][a][b][c];

    if (dfs(n - 1, a + 1, b, c, sum) !== -1) {
        return (dp[sum][a][b][c] = 'A' + dp[sum][a + 1][b][c]);
    } else if (dfs(n - 1, a, b + 1, c, sum + a) !== -1) {
        console.log(n, a, b, c, sum, dp[sum][a][b + 1][c]);
        return (dp[sum][a][b][c] = 'B' + dp[sum][a][b + 1][c]);
    } else if (dfs(n - 1, a, b, c + 1, sum + a + b) !== -1) {
        return (dp[sum][a][b][c] = 'C' + dp[sum][a][b][c + 1]);
    }

    return (dp[sum][a][b][c] = -1);
};
dfs(n);
console.log();
// console.log(dfs(1, 29, 0, 0, 0));
// console.log(dfs(0, 29, 1, 0, 29));
console.log(dp[0][29][0]);
