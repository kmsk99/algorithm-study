// 감소하는 수

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = +fs.readFileSync(PATH).toString().trim();

const combination = (arr, level) => {
    const result = [];
    if (level === 0) return arr;

    for (let i = 0; i < arr.length; i++) {
        const fixed = arr[i];
        const rest = arr.slice(i + 1);
        const combs = combination(rest, level - 1);
        const fixedCombs = combs.map((v) => v + fixed);
        result.push(...fixedCombs);
    }

    return result;
};
let dp = [];
const arr = new Array(10).fill(null).map((_, idx) => idx + '');
for (let i = 0; i < 10; i++) {
    dp.push(...combination(arr, i));
}

dp = dp.map((x) => +x).sort((a, b) => a - b);

if (input <= 1022) {
    console.log(dp[input]);
} else {
    console.log(-1);
}
