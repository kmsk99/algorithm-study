// 경찰차

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const w = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));
const dp = new Array(w + 2).fill(null).map(() => new Array(w + 2).fill(-1));
a.push([n, n]);
a.unshift([1, 1]);
const result = [];

const distance = (i, j) => {
    const x = Math.abs(a[i][0] - a[j][0]);
    const y = Math.abs(a[i][1] - a[j][1]);
    return x + y;
};

const go = (step, first, second) => {
    if (step === w) return 0;

    if (dp[first][second] !== -1) return dp[first][second];
    const v1 = go(step + 1, step + 1, second) + distance(first, step + 1);
    const v2 = go(step + 1, first, step + 1) + distance(second, step + 1);
    dp[first][second] = Math.min(v1, v2);

    return dp[first][second];
};

const path = (step, first, second) => {
    if (step === w) return 0;

    const v1 = go(step + 1, step + 1, second) + distance(first, step + 1);
    const v2 = go(step + 1, first, step + 1) + distance(second, step + 1);

    if (v1 < v2) {
        result.push(1);
        path(step + 1, step + 1, second);
    } else {
        result.push(2);
        path(step + 1, first, step + 1);
    }
};

console.log(go(0, 0, w + 1));
path(0, 0, w + 1);
console.log(result.join('\n'));
