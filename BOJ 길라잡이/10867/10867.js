// 중복 빼고 정렬하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = input[0];
const a = input[1].split(' ').map((x) => +x);
const b = {};

for (let i = 0; i < n; i++) {
    if (!b[a[i]]) b[a[i]] = 1;
    else b[a[i]]++;
}

const nums = Object.keys(b);
nums.sort((a, b) => a - b);

console.log(nums.join(' '));
