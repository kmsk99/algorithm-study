// 소수 찾기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = input[0];
const a = input[1].split(' ').map((x) => +x);
let cnt = 0;

const prime = (x) => {
    if (x === 1) return false;
    if (x === 2) return true;
    for (let i = 2; i <= Math.sqrt(x); i++) {
        if (x % i === 0) return false;
    }
    return true;
};

for (let i = 0; i < n; i++) {
    if (prime(a[i])) cnt++;
}

console.log(cnt);
