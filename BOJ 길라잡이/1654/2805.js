// 랜선 자르기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [k, n] = input[0].split(' ').map((x) => BigInt(x));
const a = input.slice(1).map((x) => BigInt(x));

let min = 1n;
let max = 0n;
let mid;

for (let i = 0; i < k; i++) {
    if (a[i] > max) max = a[i];
}

while (max >= min) {
    mid = (max + min) / 2n;
    let acc = 0n;

    for (let i = 0; i < k; i++) {
        acc += a[i] / mid;
    }

    if (acc >= n) {
        min = mid + 1n;
    } else {
        max = mid - 1n;
    }
}

let acc = 0n;
for (let i = 0; i < k; i++) {
    acc += a[i] / mid;
}
if (acc < n) mid--;

console.log(String(mid));
