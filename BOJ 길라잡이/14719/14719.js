// 빗물

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [h, w] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input
    .shift()
    .split(' ')
    .map((x) => +x);

const filled = (left, right, cur) => {
    return Math.min(left, right) - cur >= 0 ? Math.min(left, right) - cur : 0;
};

let answer = 0;

for (let i = 1; i < w - 1; i++) {
    let left = 0;
    let right = 0;
    for (let j = 0; j < i; j++) {
        left = Math.max(left, a[j]);
    }

    for (let j = i + 1; j < w; j++) {
        right = Math.max(right, a[j]);
    }

    answer += filled(left, right, a[i]);
}

console.log(answer);
