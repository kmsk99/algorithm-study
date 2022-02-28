// 영역 구하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [m, n, k] = input[0].split(' ').map((x) => +x);
const recs = input.slice(1).map((v) => v.split(' ').map((x) => +x));
const a = new Array(m).fill(null).map(() => new Array(n).fill(0));
const dir = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
];

for (const rec of recs) {
    const [ax, ay, bx, by] = rec;
    for (let y = ay; y < by; y++) {
        for (let x = ax; x < bx; x++) {
            a[y][x] = 1;
        }
    }
}

const bfs = (x, y) => {
    const queue = [[x, y]];
    a[y][x] = 1;
    let idx = 0;

    while (queue.length > idx) {
        const [cx, cy] = queue[idx];
        for (let i = 0; i < 4; i++) {
            const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
            if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
            if (a[ny][nx] === 1) continue;
            a[ny][nx] = 1;
            queue.push([nx, ny]);
        }
        idx++;
    }

    return idx;
};

const result = [];

for (let y = 0; y < m; y++) {
    for (let x = 0; x < n; x++) {
        if (a[y][x] !== 0) continue;
        result.push(bfs(x, y));
    }
}

console.log(result.length);
console.log(result.sort((a, b) => a - b).join(' '));
