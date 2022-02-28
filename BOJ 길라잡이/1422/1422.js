// 숫자의 신

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [k, n] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input;

const result = a.slice();

const cmp = (a, b) => {
    return a + b > b + a;
};

if (n - k > 0) {
    let max = '0';
    for (let i = 0; i < n; i++) {
        if (+max < +a[i]) {
            max = a[i];
        }
    }

    for (let i = 0; i < n - k; i++) {
        result.push(max);
    }
}
result.sort((a, b) => {
    return BigInt(a + b) > BigInt(b + a) ? -1 : 1;
});

console.log(result.join(''));
