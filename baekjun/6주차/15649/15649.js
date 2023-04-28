// N과 M (1)

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const n = +input[0];
const m = +input[1];
const result = [];

function findNum(number, depth) {
    const stack = [];
    const numberArray = [];
    for (let i = 1; i <= number; i++) {
        numberArray.push(i);
    }
    for (const num of numberArray) {
        stack.push([[num], depth]);
    }
    while (stack.length !== 0) {
        const [topNumber, topDepth] = stack.pop();
        if (topDepth === 1) {
            result.push(topNumber);
        }
        const availNumber = numberArray.filter((x) => {
            return topNumber.every((y) => x !== y);
        });
        for (const num of availNumber) {
            stack.push([[...topNumber, num], topDepth - 1]);
        }
    }
}

findNum(n, m);
console.log(
    result
        .reverse()
        .map((x) => x.join(' '))
        .join('\n')
);
