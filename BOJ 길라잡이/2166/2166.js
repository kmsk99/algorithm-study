// CCW

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));
const [x2, y2] = a[0];
let sum = 0;

for (let i = 1; i < n - 1; i++) {
    const [x1, y1] = a[i];
    const [x3, y3] = a[i + 1];
    const size =
        (x1 * y2 + x2 * y3 + x3 * y1 - y1 * x2 - y2 * x3 - y3 * x1) / 2;
    sum += size;
}

console.log(Math.abs(sum).toFixed(1));
