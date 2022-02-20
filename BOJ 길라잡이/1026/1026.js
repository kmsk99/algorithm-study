// 보물

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = input[0];
const a = input[1].split(' ').map((x) => +x);
const b = input[2].split(' ').map((x) => +x);
let result = 0;

a.sort((a, b) => a - b);
b.sort((a, b) => b - a);

for (let i = 0; i < n; i++) {
    result += a[i] * b[i];
}

console.log(result);
