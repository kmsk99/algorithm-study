// 약수

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = input[0];
const a = input[1].split(' ').map((x) => +x);
a.sort((a, b) => a - b);

console.log(a[0] * a[a.length - 1]);
