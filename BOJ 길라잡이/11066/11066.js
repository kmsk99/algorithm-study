// 파일 합치기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(test).toString().trim().split('\n');
let t = input.shift();

while (t-- > 0) {
    const k = +input.shift();
    const a = input
        .shift()
        .split(' ')
        .map((x) => +x)
        .sort((a, b) => b - a);
    let result = 0;

    while (a.length !== 1) {
        const x = a.pop();
        const y = a.pop();
        result += x + y;
        a.push(x + y);
        a.sort((a, b) => b - a);
    }

    console.log(result);
}
