// 바이러스

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const m = +input[1];
const links = input.slice(2).map((v) => v.split(' ').map((x) => +x));

const a = new Array(n + 1).fill(null).map(() => []);
for (const link of links) {
    a[link[0]].push(link[1]);
    a[link[1]].push(link[0]);
}
const visit = new Array(n + 1).fill(false);
let cnt = 0;

const dfs = (cur) => {
    cnt++;
    visit[cur] = true;
    const nodes = a[cur];
    for (const node of nodes) {
        if (visit[node]) continue;
        dfs(node);
    }
};

dfs(1);

console.log(cnt - 1);
