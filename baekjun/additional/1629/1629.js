// 곱셈

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const input = fs
    .readFileSync(PATH)
    .toString()
    .trim()
    .split(' ')
    .map((x) => BigInt(x));

// const input = '2147483646 2147483646 2147483647'
//     .toString()
//     .trim()
//     .split(' ')
//     .map((x) => BigInt(x));

const [a, b, c] = input;

function pow(b) {
    if (b === BigInt(0)) return 1;
    let tmp = BigInt(pow(b / BigInt(2)));
    tmp = (tmp * tmp) % c;
    if (b % BigInt(2) === BigInt(0)) return tmp;
    return (a * tmp) % c;
}

console.log(parseInt(pow(b)));
