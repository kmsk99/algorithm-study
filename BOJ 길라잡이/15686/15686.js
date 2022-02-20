// 치킨 배달

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map((x) => +x);
const a = input.slice(1).map((v) => v.split(' ').map((x) => +x));
const result = [];

const homes = [];
const chickens = [];
for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
        if (a[y][x] === 1) homes.push([x, y]);
        if (a[y][x] === 2) chickens.push([x, y]);
    }
}

const combination = (arr, count) => {
    const result = [];
    if (count === 1) return arr.map((x) => [x]);

    arr.forEach((fixed, idx, arr) => {
        const rest = arr.slice(idx + 1);
        const combs = combination(rest, count - 1);
        const fixedComb = combs.map((comb) => [fixed, ...comb]);
        result.push(...fixedComb);
    });

    return result;
};

const distance = (homes, chickens) => {
    let dist = 0;
    homes.forEach((home) => {
        let min = Number.MAX_VALUE;
        chickens.forEach((chick) => {
            min = Math.min(
                Math.abs(home[0] - chick[0]) + Math.abs(home[1] - chick[1]),
                min
            );
        });
        dist += min;
    });

    return dist;
};

const survied = combination(chickens, m);

for (let i = 0; i < survied.length; i++) {
    result.push(distance(homes, survied[i]));
}

console.log(Math.min(...result));
