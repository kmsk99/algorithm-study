// a^b

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(test).toString().trim().split('\n');

const n = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));

const dist = (a, b) => {
    return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]);
};

const cmpY = (a, b) => {
    return a[1] - b[1];
};

const cmpX = (a, b) => {
    return a[0] - b[0];
};

a.sort(cmpX);

const brute = (start, end) => {
    let minDist = Number.MAX_VALUE;
};
