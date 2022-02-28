// DFS와 BFS

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m, v] = input[0].split(' ').map((x) => +x);
const edges = input.slice(1).map((v) => v.split(' ').map((x) => +x));
const a = new Array(n + 1).fill(null).map(() => []);
a[0] = null;

for (let i = 0; i < m; i++) {
    a[edges[i][0]].push(edges[i][1]);
    a[edges[i][1]].push(edges[i][0]);
}

const dfsResult = [];
const bfsResult = [];
const visit = new Array(n + 1).fill(false);

const dfs = (cur) => {
    dfsResult.push(cur);
    visit[cur] = true;
    const nextNodes = a[cur].sort((a, b) => a - b);
    for (let i = 0; i < nextNodes.length; i++) {
        if (visit[nextNodes[i]]) continue;
        dfs(nextNodes[i]);
    }
};

const bfs = (cur) => {
    bfsResult.push(cur);
    visit[cur] = true;
    const queue = [];
    queue.push(cur);

    while (queue.length > 0) {
        const next = queue.shift();
        const nextNodes = a[next].sort((a, b) => a - b);
        nextNodes.forEach((node) => {
            if (!visit[node]) {
                visit[node] = true;
                bfsResult.push(node);
                queue.push(node);
            }
        });
    }
};

dfs(v);
visit.fill(false);
bfs(v);
console.log(dfsResult.join(' '));
console.log(bfsResult.join(' '));
