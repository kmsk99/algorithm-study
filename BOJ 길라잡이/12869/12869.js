// 뮤탈리스크

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input
    .shift()
    .split(' ')
    .map((x) => +x);

const solve = (x, y, z, level) => {
    if (x <= 0) x = 0;
    if (y <= 0) y = 0;
    if (z <= 0) z = 0;

    if (x === 0 && y === 0 && z === 0) {
        return level;
    }

    const result = [];

    if (x >= y && x >= z) {
        result.push(solve(x - 9, y - 3, z - 1, level + 1));
        result.push(solve(x - 9, y - 1, z - 3, level + 1));
    }
    if (y >= x && y >= z) {
        result.push(solve(x - 3, y - 9, z - 1, level + 1));
        result.push(solve(x - 1, y - 9, z - 3, level + 1));
    }
    if (z >= x && z >= y) {
        result.push(solve(x - 1, y - 3, z - 9, level + 1));
        result.push(solve(x - 3, y - 1, z - 9, level + 1));
    }

    return Math.min(...result);
};

console.log(solve(a[0], a[1] | 0, a[2] | 0, 0));
