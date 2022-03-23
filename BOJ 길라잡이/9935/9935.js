// 이모티콘

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [string, bomb] = input;

const stack = [];
let pt = 0;
const bombed = [];

for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (char === bomb[pt]) {
        stack.push([char, pt, i]);
        pt++;
    } else if (char === bomb[0]) {
        stack.push([char, 0, i]);
        pt = 1;
    } else {
        while (stack.length > 0) stack.pop();
        pt = 0;
    }
    if (pt === bomb.length) {
        for (let j = 0; j < bomb.length; j++) {
            const [value, idx, pos] = stack.pop();
            bombed.push(pos);
        }
        if (stack.length > 0) {
            const [value, idx, pos] = stack[stack.length - 1];
            pt = idx + 1;
        } else {
            pt = 0;
        }
    }
}

bombed.sort((a, b) => a - b);

let result = '';

let idx = 0;

for (let i = 0; i < string.length; i++) {
    if (bombed[idx] === i) {
        idx++;
        continue;
    }
    result = result + string[i];
}

if (result === '') {
    result = 'FRULA';
}

console.log(result);
