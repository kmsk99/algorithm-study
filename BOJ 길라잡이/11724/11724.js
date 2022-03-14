// 연결 요소의 개수

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

const union = (x, y) => {
    x = findParent(x);
    y = findParent(y);
    if (x < y) parent[y] = x;
    else parent[x] = y;
};

const sameParent = (x, y) => {
    x = findParent(x);
    y = findParent(y);
    return x === y;
};

for (let i = 0; i < m; i++) {
    union(a[i][0], a[i][1]);
}

const hash = {};

for (let i = 1; i <= n; i++) {
    findParent(i);
    hash[parent[i]] = true;
}

const result = Object.keys(hash).length;

console.log(result);
