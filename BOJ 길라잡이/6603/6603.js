// 로또

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');
const answer = [];

function combination(arr, selectNum) {
    const result = [];
    if (selectNum === 1) return arr.map((v) => [v]);
    arr.forEach((v, idx, arr) => {
        const fixed = v;
        const restArr = arr.slice(idx + 1);
        const combinationArr = combination(restArr, selectNum - 1);
        const combineFix = combinationArr.map((v) => [fixed, ...v]);
        result.push(...combineFix);
    });
    return result;
}

function sorting(a, b) {
    let i = 0;
    while (a[i] === b[i]) {
        i++;
    }
    return a[i] - b[i];
}

while (input[0] !== '0') {
    const [k, ...a] = input
        .shift()
        .split(' ')
        .map((x) => +x);
    answer.push(combination(a, 6).sort(sorting));
}

console.log(
    answer.map((v) => v.map((x) => x.join(' ')).join('\n')).join('\n\n')
);
