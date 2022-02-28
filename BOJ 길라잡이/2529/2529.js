// 부등호

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input[1].split(' ');
const dp = new Array(10).fill(null).map((_, idx) => idx);

const isOk = (first, second, idx) => {
    if (a[idx] === '<') {
        return first < second;
    } else {
        return first > second;
    }
};

const permutation = (arr, len, target) => {
    const result = [];
    if (len === target) return arr.map((v) => [v]);

    arr.forEach((fixed, index, array) => {
        const rest = [...array.slice(0, index), ...array.slice(index + 1)];
        const permuts = permutation(rest, len + 1, target);
        const fixedPermuts = permuts
            .map((v) => {
                return [fixed, ...v];
            })
            .filter((x) => {
                return isOk(x[0], x[1], len);
            });
        result.push(...fixedPermuts);
    });

    return result;
};

const result = permutation(dp, 0, n);
console.log(result[result.length - 1].join(''));
console.log(result[0].join(''));
