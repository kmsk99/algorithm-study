// 최종 순위

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

let t = +input.shift();
let idx = 0;

while (t-- > 0) {
    const n = +input[idx];
    const a = input[idx + 1].split(' ').map((x) => +x);
    const m = +input[idx + 2];
    const b = input
        .slice(idx + 3, idx + 3 + m)
        .map((v) => v.split(' ').map((x) => +x));
    const c = new Array(n + 1)
        .fill(null)
        .map(() => new Array(n + 1).fill(false));
    const inDegree = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        inDegree[a[i]] = i;
        for (let j = i + 1; j < n; j++) {
            c[a[i]][a[j]] = true;
        }
    }

    for (let i = 0; i < m; i++) {
        const [x, y] = b[i];
        if (c[y][x]) {
            c[y][x] = false;
            c[x][y] = true;
            inDegree[x]--;
            inDegree[y]++;
        } else {
            c[y][x] = true;
            c[x][y] = false;
            inDegree[x]++;
            inDegree[y]--;
        }
    }

    const topology = () => {
        const stack = [];
        const result = [];

        for (let i = 1; i <= n; i++) {
            if (inDegree[i] === 0) {
                stack.push(i);
            }
        }

        while (stack.length > 0) {
            if (stack.length > 1) return '?';
            const cur = stack.pop();
            result.push(cur);

            for (let i = 1; i <= n; i++) {
                if (c[cur][i]) {
                    if (--inDegree[i] === 0) {
                        stack.push(i);
                    }
                }
            }
        }

        if (result.length !== n) return 'IMPOSSIBLE';
        return result.join(' ');
    };

    console.log(topology());

    idx += m + 3;
}
