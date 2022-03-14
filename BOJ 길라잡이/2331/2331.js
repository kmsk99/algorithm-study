// 반복수열

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [n, m] = input.map((x) => +x);

const a = [null];
a[1] = n;

const next = (n, p) => {
    n = n + '';
    let answer = 0;
    for (let i = 0; i < n.length; i++) {
        answer += Math.pow(n[i], p);
    }
    return answer;
};

const hash = {};
hash[a[1]] = 1;

for (let i = 2; true; i++) {
    a[i] = next(a[i - 1], m);
    if (!hash[a[i]]) {
        hash[a[i]] = 1;
    } else if (hash[a[i]] === 2) {
        break;
    } else {
        hash[a[i]]++;
    }
}

let count = 0;

for (const nums in hash) {
    if (hash[nums] === 1) {
        count++;
    }
}

console.log(count);
