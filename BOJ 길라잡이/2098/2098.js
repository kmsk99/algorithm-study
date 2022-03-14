// 외판원 순회

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));
const d = new Array(Math.pow(2, n))
    .fill(null)
    .map(() => new Array(n).fill(Infinity));

const tsp = (node, visited) => {
    if (visited === (1 << n) - 1) {
        if (a[node][0] === 0) return Infinity;

        return a[node][0];
    }

    if (d[visited][node] !== Infinity) {
        return d[visited][node];
    }

    for (let i = 0; i < n; i++) {
        if ((visited & (1 << i)) !== 0 || a[node][i] === 0) continue;
        const next = visited | (1 << i);

        d[visited][node] = Math.min(
            d[visited][node],
            tsp(i, next) + a[node][i]
        );
    }

    return d[visited][node];
};

console.log(tsp(0, 1));
