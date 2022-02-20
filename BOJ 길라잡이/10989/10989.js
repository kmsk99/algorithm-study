// 수 정렬하기 3

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input.slice(1).map((x) => +x);
const b = new Array(10001).fill(0);
const result = [];

for (let i = 0; i < n; i++) {
    b[a[i]]++;
}

for (let i = 0; i < 10001; i++) {
    if (b[i] === 0) continue;
    while (b[i] !== 0) {
        result.push(i);
        b[i]--;
    }
}

console.log(result.join('\n'));
