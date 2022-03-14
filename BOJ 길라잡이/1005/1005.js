// ACM Craft

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

let t = +input.shift();

let idx = 0;

while (t-- > 0) {
    const [n, k] = input[idx].split(' ').map((x) => +x);
    const d = input[idx + 1].split(' ').map((x) => +x);
    const a = input
        .slice(idx + 2, idx + k + 2)
        .map((v) => v.split(' ').map((x) => +x));
    const w = input[idx + k + 2];
    idx += k + 3;
    d.unshift(null);

    const inDegree = new Array(n + 1).fill(0);
    const delay = new Array(n + 1).fill(0);
    const b = new Array(n + 1).fill(null).map(() => []);

    for (let i = 0; i < k; i++) {
        const [x, y] = a[i];
        inDegree[y]++;
        b[x].push(y);
    }

    const stack = [];

    for (let i = 1; i <= n; i++) {
        if (inDegree[i] === 0) {
            stack.push(i);
            delay[i] = d[i];
        }
    }

    while (stack.length > 0) {
        const node = stack.pop();
        const nexts = b[node];
        nexts.forEach((v) => {
            delay[v] = Math.max(delay[node] + d[v], delay[v]);
            inDegree[v]--;
            if (inDegree[v] === 0) {
                stack.push(v);
            }
        });
    }

    console.log(delay[w]);
}
