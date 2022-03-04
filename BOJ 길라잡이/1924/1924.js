// 2007년

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');
const [x, y] = input.map((x) => +x);

const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const date = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const day =
    month.slice(0, x - 1).reduce((acc, cur) => {
        acc += cur;
        return acc;
    }, 0) + y;

console.log(date[day % 7]);
