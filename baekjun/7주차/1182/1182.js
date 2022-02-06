// 부분수열의 합

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');
const [size, sum] = input[0].split(' ').map((x) => +x);
const nums = input[1].split(' ').map((x) => +x);
let count = 0;

function findNum(cur, tot) {
    if (cur === size) {
        if (tot === sum) count++;
        return;
    }
    findNum(cur + 1, tot);
    findNum(cur + 1, tot + nums[cur]);
}

findNum(0, 0);
if (sum === 0) count--;

console.log(count);
