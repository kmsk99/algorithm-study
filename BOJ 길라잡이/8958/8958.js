// OX퀴즈

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');
let n = +input.shift();
let idx = 0;
while (n !== idx) {
    const a = input[idx];
    const len = a.length;
    const dp = new Array(len).fill(0);
    for (let i = 0; i < len; i++) {
        if (a[i] === 'O') {
            if (i === 0) {
                dp[i] = 1;
                continue;
            }
            dp[i] = dp[i - 1] + 1;
        }
    }
    console.log(dp.reduce((acc, cur) => (acc += cur), 0));
    idx++;
}
