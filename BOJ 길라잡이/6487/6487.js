// 두 직선의 교차 여부

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

let t = +input.shift();
const result = [];

while (t-- > 0) {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = input
        .shift()
        .split(' ')
        .map((x) => +x);

    const a = x2 - x1;
    const b = y2 - y1;
    const c = x4 - x3;
    const d = y4 - y3;

    if (a * d - b * c) {
        const r = (d * (x3 - x1) - c * (y3 - y1)) / (a * d - b * c);
        result.push(
            `POINT ${(a * r + x1).toFixed(2)} ${(b * r + y1).toFixed(2)}`
        );
    } else {
        if ((x3 - x1) * b - (y3 - y1) * a) {
            result.push('NONE');
        } else {
            result.push('LINE');
        }
    }
}

console.log(result.join('\n'));
