// 순열 사이클

'use strict';

const fs = require('fs');
const { deflateSync } = require('zlib');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

let t = +input.shift();

while (t-- > 0) {
    const n = +input.shift();
    const a = [
        null,
        ...input
            .shift()
            .split(' ')
            .map((x) => +x),
    ];

    const visited = new Array(n + 1).fill(false);
    const done = new Array(n + 1).fill(false);
    let count = 0;

    const dfs = (start) => {
        const next = a[start];
        if (visited[start]) {
            if (done[start]) return;

            for (let i = next; i !== start; i = a[i]) {
                done[next] = true;
            }
            done[start] = true;
            count++;
            return;
        }
        visited[start] = true;
        dfs(next);
    };

    for (let i = 1; i <= n; i++) {
        if (visited[i]) continue;
        dfs(i);
    }

    console.log(count);
}
