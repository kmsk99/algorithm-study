// 회의실 배정

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input.slice(1).map((v) => v.split(' ').map((x) => +x));

const sorting = (a, b) => {
    if (a[1] === b[1]) {
        return a[0] - b[0];
    } else {
        return a[1] - b[1];
    }
};

a.sort(sorting);

let end = 0;
let cnt = 0;

for (let i = 0; i < n; i++) {
    if (a[i][0] >= end) {
        end = a[i][1];
        cnt++;
    }
}

console.log(cnt);
