// 나무 자르기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map((x) => BigInt(x));
const a = input[1].split(' ').map((x) => BigInt(x));

let min = 0n;
let max = 1000000000n;
let mid;

while (max >= min) {
    mid = (max + min) / 2n;
    let acc = 0n;

    for (let i = 0; i < n; i++) {
        if (a[i] > mid) acc += a[i] - mid;
        if (acc > m) continue;
    }

    if (acc >= m) {
        min = mid + 1n;
    } else {
        max = mid - 1n;
    }
}

let acc = 0n;
for (let i = 0; i < n; i++) {
    if (a[i] > mid) acc += a[i] - mid;
}
if (acc < m) mid--;

console.log(String(mid));
