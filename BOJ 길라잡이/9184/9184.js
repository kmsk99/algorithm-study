// 신나는 함수 실행

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const dp = new Array(21)
    .fill(null)
    .map(() => new Array(21).fill(null).map(() => new Array(21).fill(0)));

const w = (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0) {
        return 1;
    }

    if (a > 20 || b > 20 || c > 20) {
        return w(20, 20, 20);
    }

    if (dp[a][b][c]) {
        return dp[a][b][c];
    }

    if (a < b && b < c) {
        dp[a][b][c] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
        return dp[a][b][c];
    } else {
        dp[a][b][c] =
            w(a - 1, b, c) +
            w(a - 1, b - 1, c) +
            w(a - 1, b, c - 1) -
            w(a - 1, b - 1, c - 1);
        return dp[a][b][c];
    }
};

const a = input.map((v) => v.split(' ').map((x) => +x));
const result = [];

for (let i = 0; !(a[i][0] === -1 && a[i][1] === -1 && a[i][2] === -1); i++) {
    result.push(
        `w(${a[i][0]}, ${a[i][1]}, ${a[i][2]}) = ${w(
            a[i][0],
            a[i][1],
            a[i][2]
        )}`
    );
}

console.log(result.join('\n'));
