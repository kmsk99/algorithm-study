// 스타트와 링크

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = input[0];
const a = input.slice(1).map((v) => v.split(' ').map((x) => +x));
const b = new Array(n);
for (let i = 0; i < n; i++) {
    b[i] = i;
}

const getSum = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        const [x, y] = arr[i];
        sum += a[y][x];
        sum += a[x][y];
    }
    return sum;
};

const combination = (array, count) => {
    const result = [];
    if (count === 1) return array.map((x) => [x]);

    array.forEach((fixed, idx, arr) => {
        const rest = arr.slice(idx + 1);
        const comb = combination(rest, count - 1);
        const fixedArr = comb.map((v) => [fixed, ...v]);
        result.push(...fixedArr);
    });

    return result;
};

const opposite = (array, team) => {
    for (let i = 0; i < team.length; i++) {
        array = array.filter((x) => x !== team[i]);
    }
    return array;
};

const teams = combination(b, n / 2);
let result = [];

for (let i = 0; i < teams.length; i++) {
    const start = teams[i];
    const link = opposite(b, start);
    const startSum = getSum(combination(start, 2));
    const linkSum = getSum(combination(link, 2));
    result.push(Math.abs(startSum - linkSum));
}

console.log(Math.min(...result));
