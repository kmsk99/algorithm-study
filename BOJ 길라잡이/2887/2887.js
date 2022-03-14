// 행성 터널

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
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

const x = [];
const y = [];
const z = [];

for (let i = 0; i < n; i++) {
    x.push([a[i][0], i]);
    y.push([a[i][1], i]);
    z.push([a[i][2], i]);
}
x.sort((a, b) => a[0] - b[0]);
y.sort((a, b) => a[0] - b[0]);
z.sort((a, b) => a[0] - b[0]);

const b = [];

for (let i = 0; i < n - 1; i++) {
    b.push([x[i][1], x[i + 1][1], x[i + 1][0] - x[i][0]]);
    b.push([y[i][1], y[i + 1][1], y[i + 1][0] - y[i][0]]);
    b.push([z[i][1], z[i + 1][1], z[i + 1][0] - z[i][0]]);
}

b.sort((a, b) => a[2] - b[2]);

let result = 0;
let count = 0;

for (let i = 0; count < n - 1; i++) {
    const [x, y, cost] = b[i];
    if (sameParent(x, y)) continue;
    unionParent(x, y);
    result += cost;
    count++;
}

console.log(result);
