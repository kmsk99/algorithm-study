// 골드바흐의 추측

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');
const result = [];

const a = new Array(1000001).fill(true);
const b = [];
const primes = {};
a[0] = false;
a[1] = false;

for (let i = 2; i <= Math.sqrt(1000001); i++) {
    if (!a[i]) continue;
    for (let j = 2 * i; j <= 1000001; j += i) {
        a[j] = false;
    }
}

for (let i = 2; i <= 1000001; i++) {
    if (!a[i]) continue;
    b.push(i);
    primes[i] = true;
}

for (const n of input) {
    if (n === '0') break;

    for (let i = 0; i < b.length; i++) {
        const prime = b[i];
        if (primes[+n - prime]) {
            result.push(`${+n} = ${prime} + ${+n - prime}`);
            break;
        }
    }
}

console.log(result.join('\n'));
