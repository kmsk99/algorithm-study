// a^b

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [a, b] = input;

let num = BigInt(a.split('.').join(''));
let ten = a.split('.')[1].length * +b;

const pow = (num, level) => {
    level = BigInt(level);
    if (level === 1n) return num;
    return num * pow(num, level - 1n);
};

const multi = String(pow(num, b));
const len = multi.length;
let result;

if (len > ten) {
    result = multi.slice(0, len - ten) + '.' + multi.slice(len - ten);
} else {
    result = '0.' + '0'.repeat(ten - len) + multi;
}

console.log(result);
