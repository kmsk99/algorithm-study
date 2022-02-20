// 소수의 연속합

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const n = +fs.readFileSync(PATH).toString().trim();
const a = new Array(n + 1).fill(true);
const primes = [];
let cnt = 0;
a[0] = false;
a[1] = false;

for (let i = 2; i <= Math.sqrt(n); i++) {
    if (!a[i]) continue;
    for (let j = 2 * i; j <= n; j += i) {
        a[j] = false;
    }
}

for (let i = 2; i <= n; i++) {
    if (!a[i]) continue;
    primes.push(i);
}

for (let i = 0; i < primes.length; i++) {
    let acc = 0;
    for (let j = i; acc < n; j++) {
        acc += primes[j];
    }
    if (acc === n) {
        cnt++;
    }
}

console.log(cnt);
