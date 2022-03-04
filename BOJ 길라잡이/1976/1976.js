// 여행 가자

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const m = +input[1];
const a = input.slice(2, 2 + n).map((v) => v.split(' ').map((x) => +x));
const b = input[2 + n].split(' ').map((x) => +x - 1);
const c = new Array(n).fill(null).map((_, idx) => idx);

const findParent = (x) => {
    if (x === c[x]) return x;
    c[x] = findParent(c[x]);
    return c[x];
};

const setUnion = (x, y) => {
    x = findParent(x);
    y = findParent(y);

    if (x < y) {
        c[y] = x;
    } else {
        c[x] = y;
    }
};

for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        if (a[i][j] === 0) continue;
        setUnion(i, j);
    }
}

const start = findParent(b[0]);
let result = 'YES';
for (let i = 1; i < m; i++) {
    if (start !== findParent(b[i])) {
        result = 'NO';
        break;
    }
}

console.log(result);
