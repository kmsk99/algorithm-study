// 소수 구하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [a, b] = input.map((x) => +x);

const min = (a, b) => {
    while ((a > b && a % b !== 0) || (a < b && b % a !== 0)) {
        if (a > b) {
            a = a % b;
        } else {
            b = b % a;
        }
    }
    if (a > b) {
        return b;
    } else {
        return a;
    }
};

const max = (a, b) => {
    const gcb = min(a, b);
    return (a * b) / gcb;
};

console.log(min(a, b));

console.log(max(a, b));
