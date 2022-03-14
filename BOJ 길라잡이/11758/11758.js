// CCW

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [[x1, y1], [x2, y2], [x3, y3]] = input.map((v) =>
    v.split(' ').map((x) => BigInt(x))
);

const number = x1 * y2 + x2 * y3 + x3 * y1 - (y1 * x2 + y2 * x3 + y3 * x1);

if (number < 0n) {
    console.log(-1);
} else if (number === 0n) {
    console.log(0);
} else if (number > 0n) {
    console.log(1);
}
