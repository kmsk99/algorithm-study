// 좌표 정렬하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = input[0];
const a = input.slice(1).map((v) => v.split(' ').map((x) => +x));

const sorting = (a, b) => {
    if (a[0] !== b[0]) {
        return a[0] - b[0];
    } else {
        return a[1] - b[1];
    }
};

a.sort(sorting);

console.log(a.map((x) => x.join(' ')).join('\n'));
