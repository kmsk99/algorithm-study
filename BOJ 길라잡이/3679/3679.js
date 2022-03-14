// 단순 다각형

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(test).toString().trim().split('\n');

let t = +input.shift();

while (t-- > 0) {
    const a = input
        .shift()
        .split(' ')
        .map((x) => +x);
    const n = a.shift();
    const b = new Array(n).fill(null).map(() => new Array(2));
    for (let i = 0; i < n; i++) {
        b[i][0] = a[2 * i];
        b[i][1] = a[2 * i + 1];
    }

    console.log(b);
}
