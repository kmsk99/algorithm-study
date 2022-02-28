// 제곱 ㄴㄴ 수

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim();

const [min, max] = input.split(' ').map((x) => +x);

const a = new Array(max - min + 1).fill(true);
let cnt = 0;

for (let i = 2; i * i <= max; i++) {
    for (let j = Math.floor(min / i / i); i * i * j <= max; j++) {
        if (i * i * j - min < 0) continue;
        a[i * i * j - min] = false;
    }
}

for (let i = 0; i < a.length; i++) {
    if (a[i]) cnt++;
}

console.log(cnt);
