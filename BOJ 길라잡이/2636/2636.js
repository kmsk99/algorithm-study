// 치즈

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map((x) => +x);
const a = input.slice(1).map((v) => v.split(' ').map((x) => +x));
const dir = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
];

const air = () => {
    const visit = new Array(n).fill(null).map(() => new Array(m).fill(false));
    const queue = [[0, 0]];
    let idx = 0;

    while (queue.length > idx) {
        const [cx, cy] = queue[idx];
        for (let i = 0; i < 4; i++) {
            const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
            if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
            if (a[ny][nx] === 1) continue;
            if (visit[ny][nx]) continue;
            visit[ny][nx] = true;
            queue.push([nx, ny]);
        }
        idx++;
    }

    return queue;
};

const bfs = () => {
    const queue = air();
    let idx = 0;

    while (queue.length > idx) {
        const [cx, cy] = queue[idx];
        for (let i = 0; i < 4; i++) {
            const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
            if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
            if (a[ny][nx] === 0) continue;
            a[ny][nx] = 0;
        }
        idx++;
    }
};

let count = 0;
let prev = 0;
while (true) {
    let left = 0;
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < m; x++) {
            if (a[y][x] === 1) left++;
        }
    }

    if (left === 0) {
        break;
    }

    bfs();
    count++;
    prev = left;
}

console.log(count + '\n' + prev);
