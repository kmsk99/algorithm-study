// 파일 합치기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');
let t = input.shift();

while (t-- > 0) {
    const k = +input.shift();
    const a = input
        .shift()
        .split(' ')
        .map((x) => +x);

    const dp = new Array(k + 1).fill(null).map(() => new Array(k + 1).fill(0));
    const sum = new Array(k + 1).fill(0);
    for (let i = 0; i < k; i++) {
        sum[i + 1] = sum[i] + a[i];
    }

    for (let gap = 1; gap <= k; gap++) {
        for (let start = 1; start + gap <= k; start++) {
            const mids = [];
            for (let mid = start; mid < start + gap; mid++) {
                mids.push(
                    dp[start][mid] +
                        dp[mid + 1][start + gap] +
                        sum[start + gap] -
                        sum[start - 1]
                );
            }
            dp[start][start + gap] = Math.min(...mids);
        }
    }
    console.log(dp[1][k]);
}
