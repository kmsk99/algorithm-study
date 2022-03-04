// N과 M (4)

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');
const [N, M] = input.map((x) => +x);

const a = new Array(N).fill(null).map((_, idx) => idx + 1);

const permutation = (arr, level) => {
    const result = [];
    if (level === 1) return arr.map((x) => [x]);

    arr.forEach((fixed, idx) => {
        const rest = arr.slice(idx);
        const permutations = permutation(rest, level - 1);
        const fixedPermutations = permutations.map((v) => [fixed, ...v]);
        result.push(...fixedPermutations);
    });

    return result;
};

const result = permutation(a, M)
    .map((x) => x.join(' '))
    .join('\n');
console.log(result);
