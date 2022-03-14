// 최소 스패닝 트리

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input.map((v) => v.split(' ').map((x) => +x));
const parent = new Array(n + 1).fill(null).map((_, idx) => idx);

const findParent = (x) => {
    if (x === parent[x]) return x;
    parent[x] = findParent(parent[x]);
    return parent[x];
};

const unionParent = (x, y) => {
    x = findParent(x);
    y = findParent(y);
    if (x < y) {
        parent[y] = x;
    } else {
        parent[x] = y;
    }
};

const sameParent = (x, y) => {
    x = findParent(x);
    y = findParent(y);
    return x === y;
};

a.sort((a, b) => a[2] - b[2]);

let result = 0;

for (let i = 0; i < m; i++) {
    const [x, y, c] = a[i];
    if (sameParent(x, y)) continue;
    unionParent(x, y);
    result += c;
}

console.log(result);
