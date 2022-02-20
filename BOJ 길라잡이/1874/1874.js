// 스택 수열

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = input[0];
const a = input.slice(1).map((x) => +x);
const stack = [];
let result = [];

let idx = 1;
let pos = 0;

while (pos < a.length) {
    if (stack[stack.length - 1] !== a[pos]) {
        stack.push(idx);
        result.push('+');
        if (idx > n) {
            result = ['NO'];
            break;
        }
        idx++;
    } else {
        stack.pop();
        result.push('-');
        pos++;
    }
}

console.log(result.join('\n'));
