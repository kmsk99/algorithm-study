// 숫자 카드 2

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input[1].split(' ').map((x) => +x);
const m = +input[2];
const b = input[3].split(' ').map((x) => +x);
const hash = {};
const result = new Array(m).fill(0);

for (let i = 0; i < n; i++) {
    if (!hash[a[i]]) hash[a[i]] = 1;
    else hash[a[i]]++;
}

const nums = Object.keys(hash)
    .map((x) => +x)
    .sort((a, b) => a - b);

for (let i = 0; i < m; i++) {
    let left = 0;
    let right = nums.length;
    let mid;

    while (left <= right) {
        mid = parseInt((right + left) / 2);
        if (b[i] === nums[mid]) {
            result[i] = hash[nums[mid]];
            break;
        }

        if (b[i] < nums[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
}

console.log(result.join(' '));
