// 줄 세우기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input.map((v) => v.split(' ').map((x) => +x));
const b = new Array(n + 1).fill(null).map(() => []);
const inDegree = new Array(n + 1).fill(0);

for (let i = 0; i < m; i++) {
    inDegree[a[i][1]]++;
    b[a[i][0]].push(a[i][1]);
}

const stack = [];
for (let i = 1; i < n + 1; i++) {
    if (inDegree[i] === 0) {
        stack.push(i);
    }
}

const result = [];
while (stack.length > 0) {
    const node = stack.pop();
    result.push(node);
    const nexts = b[node];
    nexts.forEach((v) => {
        inDegree[v]--;
        if (inDegree[v] === 0) {
            stack.push(v);
        }
    });
}

console.log(result.join(' '));
