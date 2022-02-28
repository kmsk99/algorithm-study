// 책 나눠주기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const result = [];
let t = +input.shift();

while (t !== 0) {
    const [n, m] = input
        .shift()
        .split(' ')
        .map((x) => +x);
    const a = new Array(n);
    const b = new Array(m + 1).fill(null).map(() => []);
    const d = new Array(n + 1).fill(0);

    for (let i = 0; i < m; i++) {
        a[i] = input
            .shift()
            .split(' ')
            .map((x) => +x);
    }

    for (let i = 0; i < m; i++) {
        for (let j = a[i][0]; j <= a[i][1]; j++) {
            b[i + 1].push(j);
        }
    }
    const visit = new Array(n + 1).fill(false);

    const dfs = (x) => {
        for (let i = 0; i < b[x].length; i++) {
            const next = b[x][i];
            if (visit[next]) continue;
            visit[next] = true;
            if (d[next] === 0 || dfs(d[next])) {
                d[next] = x;
                return true;
            }
        }
        return false;
    };

    for (let i = 1; i <= m; i++) {
        dfs(i);
        visit.fill(false);
    }

    const max = d.reduce((acc, cur) => {
        if (cur !== 0) {
            return (acc += 1);
        } else {
            return acc;
        }
    }, 0);

    result.push(max);

    t--;
}

console.log(result.join('\n'));
