// 벽 부수고 이동하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map((x) => +x);
const a = input.slice(1).map((v) => v.split('').map((x) => +x));
const visit = new Array(n)
    .fill(null)
    .map(() => new Array(m).fill(null).map(() => new Array(2).fill(false)));
const dir = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
];

const bfs = () => {
    const queue = [[0, 0, 1, 1]];
    let idx = 0;
    visit[0][0][0] = true;
    visit[0][0][1] = true;

    while (queue.length > idx) {
        const [cx, cy, cc, power] = queue[idx];
        if (cx === m - 1 && cy === n - 1) {
            return cc;
        }
        for (let i = 0; i < 4; i++) {
            const [nx, ny, nc] = [cx + dir[0][i], cy + dir[1][i], cc + 1];
            if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
            if (visit[ny][nx][power]) continue;
            if (a[ny][nx] === 1) {
                if (power === 1) {
                    visit[ny][nx][0] = true;
                    queue.push([nx, ny, nc, 0]);
                } else continue;
            } else {
                visit[ny][nx][power] = true;
                queue.push([nx, ny, nc, power]);
            }
        }
        idx++;
    }

    return -1;
};

console.log(bfs());
