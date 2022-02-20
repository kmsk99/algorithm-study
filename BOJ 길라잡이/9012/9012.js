// 괄호

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input.slice(1);
const result = [];

for (let i = 0; i < n; i++) {
    let cnt = 0;
    let cur = 'YES';
    for (let j = 0; j < a[i].length; j++) {
        if (a[i][j] === '(') {
            cnt++;
        }
        if (a[i][j] === ')') {
            if (cnt === 0) {
                cur = 'NO';
                break;
            }
            cnt--;
        }
    }
    if (cnt > 0) cur = 'NO';
    result.push(cur);
}

console.log(result.join('\n'));
