// 비밀번호 변경

'use strict';

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(test).toString().trim().split('\n');

const s = input.shift().split('');
const k = +input.shift();
const dp = new Array(s.length).fill(false);
let count = 0;

for (let i = 0; i < k; i++) {
    const a = s[i];
    const b = s[i + s.length - k];
    console.log(a, b);
    if (a === b) {
        dp[i] = true;
        dp[i + s.length - k] = true;
        count++;
    }
}

console.log(dp);
console.log(count);
