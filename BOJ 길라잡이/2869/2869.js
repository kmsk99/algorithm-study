// 달팽이는 올라가고 싶다

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [a, b, v] = input.map((x) => +x);

console.log(Math.ceil((v - a) / (a - b)) + 1);
