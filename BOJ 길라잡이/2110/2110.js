// 공유기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, c] = input[0].split(' ').map((x) => +x);
const a = input.slice(1).map((x) => +x);
a.sort((a, b) => a - b);

let left = 1;
let right = a[n - 1] - a[0];
let answer;
let mid;
let d = 0;

while (left <= right) {
    mid = Math.floor((left + right) / 2);
    let start = a[0];
    let cnt = 1;

    for (let i = 1; i < n; i++) {
        d = a[i] - start;
        if (mid <= d) {
            cnt++;
            start = a[i];
        }
    }

    if (cnt >= c) {
        answer = mid;
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

console.log(answer);
