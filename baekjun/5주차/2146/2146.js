// 다리 만들기

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(test).toString().trim().split('\n');

const size = input.shift();
const map = input.map((v) => v.split('').map((x) => +x));
