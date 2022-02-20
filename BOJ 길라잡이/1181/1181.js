// 단어 정렬

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = input[0];
const a = input.slice(1);
const result = [];
const sorting = (a, b) => {
    if (a.length !== b.length) {
        return a.length - b.length;
    }
    let i = 0;
    while (a[i] === b[i] && i < a.length) {
        i++;
    }
    return a.charCodeAt(i) - b.charCodeAt(i);
};

a.sort(sorting);
result.push(a[0]);
for (let i = 1; i < n; i++) {
    if (a[i - 1] === a[i]) continue;
    result.push(a[i]);
}

console.log(result.join('\n'));
