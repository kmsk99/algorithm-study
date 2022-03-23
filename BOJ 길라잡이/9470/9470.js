// Strahler 순서

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

let t = +input.shift();
let idx = 0;
const answer = [];

while (t-- > 0) {
    const [k, m, p] = input[idx].split(' ').map((x) => +x);
    const a = input
        .slice(idx + 1, idx + p + 1)
        .map((v) => v.split(' ').map((x) => +x));
    const b = new Array(m + 1).fill(null).map(() => []);
    const inDegree = new Array(m + 1)
        .fill(null)
        .map(() => new Array(2).fill(0));
    const dp = new Array(m + 1).fill(0);

    for (let i = 0; i < p; i++) {
        b[a[i][1]].push(a[i][0]);
        inDegree[a[i][0]][0]++;
        inDegree[a[i][1]][1]++;
    }

    const dfs = (end) => {
        if (inDegree[end][1] === 0) return (dp[end] = 1);

        if (dp[end] !== 0) return dp[end];

        let max = 0;
        let count = 0;

        for (const start of b[end]) {
            const size = dfs(start);
            if (max < size) {
                max = size;
                count = 0;
            } else if (max === size) {
                count++;
            }
        }

        if (count === 0) {
            return max;
        } else {
            return max + 1;
        }
    };

    let result;

    for (let i = 1; i <= m; i++) {
        if (inDegree[i][0] === 0) {
            result = dfs(i);
        }
    }

    answer.push(`${k} ${result}`);

    idx += p + 1;
}

console.log(answer.join('\n'));
