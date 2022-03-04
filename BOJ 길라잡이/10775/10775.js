// 공항

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const g = +input[0];
const p = +input[1];
const a = input.slice(2).map((x) => +x);
const b = new Array(g + 1).fill(null).map((_, idx) => idx);

const findParent = (x) => {
    if (x === b[x]) return x;
    b[x] = findParent(b[x]);
    return b[x];
};

const dfs = (idx) => {
    let range = a[idx];

    while (range !== 0) {
        if (b[range] === range) {
            b[range] = b[range - 1];
            return true;
        } else {
            range = findParent(range);
        }
    }

    return false;
};

let result = p;
for (let i = 0; i < p; i++) {
    if (dfs(i)) continue;
    else {
        result = i;
        break;
    }
}
console.log(result);
