// 달리기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m, k] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const [y1, x1, y2, x2] = input
    .pop()
    .split(' ')
    .map((x) => +x);
const a = input.map((v) => v.split(''));
const dir = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
];

const bfs = () => {
    const queue = [[x1 - 1, y1 - 1]];
    const visit = new Array(n)
        .fill(null)
        .map(() => new Array(m).fill(Infinity));
    visit[y1 - 1][x1 - 1] = 0;
    let idx = 0;

    while (queue.length > idx) {
        const [cx, cy] = queue[idx];
        if (cx === x2 - 1 && cy === y2 - 1) {
            return visit[cy][cx];
        }

        for (let i = 0; i < 4; i++) {
            let dist = 0;
            while (dist++ < k) {
                const [nx, ny] = [cx + dir[0][i] * dist, cy + dir[1][i] * dist];
                if (nx < 0 || ny < 0 || nx >= m || ny >= n) break;
                if (a[ny][nx] === '#') break;
                if (visit[ny][nx] < visit[cy][cx] + 1) break;
                if (visit[ny][nx] === Infinity) {
                    visit[ny][nx] = visit[cy][cx] + 1;
                    queue.push([nx, ny]);
                } else {
                    visit[ny][nx] = visit[cy][cx] + 1;
                }
            }
        }

        idx++;
    }

    return -1;
};

console.log(bfs());
