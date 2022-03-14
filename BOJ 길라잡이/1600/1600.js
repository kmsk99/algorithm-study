// 말이 되고픈 원숭이

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const k = +input.shift();
const [w, h] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const map = input.map((v) => v.split(' ').map((x) => +x));
const dp = new Array(h)
    .fill(null)
    .map(() => new Array(w).fill(null).map(() => new Array(k + 1).fill(false)));

const dir = [
    [1, 2, 2, 1, -1, -2, -2, -1, 1, -1, 0, 0],
    [2, 1, -1, -2, -2, -1, 1, 2, 0, 0, 1, -1],
];

const bfs = () => {
    const queue = [[0, 0, 0, 0]];
    dp[0][0][0] = true;
    let idx = 0;

    while (queue.length > idx) {
        const [cx, cy, cj, ck] = queue[idx];
        if (cx === w - 1 && cy === h - 1) return ck;
        for (let i = 0; i < 12; i++) {
            if (i < 8) {
                const [nx, ny, nj, nk] = [
                    cx + dir[0][i],
                    cy + dir[1][i],
                    cj + 1,
                    ck + 1,
                ];
                if (nj > k) continue;
                if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
                if (map[ny][nx] === 1) continue;
                if (dp[ny][nx][nj]) continue;
                dp[ny][nx][nj] = true;
                queue.push([nx, ny, nj, nk]);
            } else {
                const [nx, ny, nj, nk] = [
                    cx + dir[0][i],
                    cy + dir[1][i],
                    cj,
                    ck + 1,
                ];
                if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
                if (map[ny][nx] === 1) continue;
                if (dp[ny][nx][nj]) continue;
                dp[ny][nx][nj] = true;
                queue.push([nx, ny, nj, nk]);
            }
        }
        idx++;
    }
    return -1;
};

console.log(bfs());
