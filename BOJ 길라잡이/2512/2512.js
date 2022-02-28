// 예산

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input
    .shift()
    .split(' ')
    .map((x) => +x);
const m = +input.shift();

let left = 1;
let right = 0;
let mid;

for (let i = 0; i < n; i++) {
    if (a[i] > right) right = a[i];
}

while (left <= right) {
    mid = Math.floor((left + right) / 2);
    let acc = 0;

    for (let i = 0; i < n; i++) {
        if (a[i] <= mid) acc += a[i];
        else acc += mid;
    }

    if (acc > m) {
        right = mid - 1;
    } else {
        left = mid + 1;
    }
}

let acc = 0;

for (let i = 0; i < n; i++) {
    if (a[i] <= mid) acc += a[i];
    else acc += mid;
}

if (acc > m) mid--;

console.log(mid);
