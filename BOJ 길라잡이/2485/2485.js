// 가로수

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');
const n = +input[0];
const a = input.slice(1).map((x) => +x);
let b = [];
a.sort((a, b) => a - b);
let min = Number.MAX_VALUE;

for (let i = 1; i < n; i++) {
    b.push(a[i] - a[i - 1]);
}

const gcd = (a, b) => {
    return b ? gcd(b, a % b) : a;
};

for (let i = 1; i < n - 1; i++) {
    const temp = gcd(b[i], b[i - 1]);
    if (temp < min) min = temp;
}

console.log((a[n - 1] - a[0]) / min - n + 1);
