// 친구 네트워크

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

let t = +input[0];
let idx = 1;

while (t-- !== 0) {
    const f = +input[idx];
    const a = input.slice(idx + 1, idx + 1 + f).map((v) => v.split(' '));
    const hash = {};
    const count = {};
    const result = [];

    const findRoot = (name) => {
        if (name === hash[name]) return name;
        if (!hash[name]) hash[name] = name;
        hash[name] = findRoot(hash[name]);
        return hash[name];
    };

    const add = (a, b) => {
        a = findRoot(a);
        b = findRoot(b);

        if (a === b) {
            result.push(count[a]);
            return;
        }
        if (!count[a]) count[a] = 1;
        if (!count[b]) count[b] = 1;
        hash[b] = a;
        count[a] += count[b];
        result.push(count[a]);
    };

    for (let i = 0; i < f; i++) {
        add(a[i][0], a[i][1]);
    }

    console.log(result.join('\n'));

    idx += 1 + f;
}
