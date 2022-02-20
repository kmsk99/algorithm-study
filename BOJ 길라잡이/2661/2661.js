// 좋은수열

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = +fs.readFileSync(PATH).toString().trim();
let result = '';

const dfs = (depth, str = '') => {
    if (result !== '') return;
    if (depth === 0) {
        result = str;
        return;
    }
    for (let i = 1; i < 4; i++) {
        if (good(str + i)) {
            dfs(depth - 1, str + i);
        }
    }
};

const good = (str) => {
    const len = str.length;

    for (let size = 1; size <= len / 2; size++) {
        for (let start = 0; start + 2 * size <= len; start++) {
            const str1 = str.slice(start, start + size);
            const str2 = str.slice(start + size, start + 2 * size);
            if (str1 === str2) return false;
        }
    }

    return true;
};

dfs(input);
console.log(result);
