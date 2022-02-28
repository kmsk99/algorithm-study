// 입국심사

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map((x) => BigInt(x));
const a = input.slice(1).map((x) => BigInt(x));
let max = 0n;
for (let i = 0n; i < n; i++) {
    if (max < a[i]) max = a[i];
}

const cost = (time) => {
    let count = 0n;
    for (let i = 0n; i < n; i++) {
        count += time / a[i];
    }

    return count;
};

let left = 0n;
let right = m * max;
let mid;
while (left <= right) {
    mid = (left + right) / 2n;

    if (cost(mid) >= m) {
        right = mid - 1n;
    } else {
        left = mid + 1n;
    }
}

console.log(String(left));
