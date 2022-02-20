// 숫자 카드

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input[1].split(' ').map((x) => +x);
const m = +input[2];
const b = input[3].split(' ').map((x) => +x);
const result = new Array(m).fill(0);

a.sort((a, b) => a - b);

for (let i = 0; i < m; i++) {
    let left = 0;
    let right = n;
    let mid;

    while (left <= right) {
        mid = parseInt((right + left) / 2);
        if (b[i] === a[mid]) {
            result[i] = 1;
            break;
        }

        if (b[i] < a[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
}

console.log(result.join(' '));
