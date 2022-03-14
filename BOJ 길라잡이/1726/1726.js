// 로봇

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [m, n] = input
    .shift()
    .split(' ')
    .map((x) => +x);

const map = input.slice(0, m).map((v) => v.split(' ').map((x) => +x));
const b = input.slice(m).map((v) => v.split(' ').map((x) => +x));
const dir = [
    [null, 1, -1, 0, 0],
    [null, 0, 0, 1, -1],
];
const visit = new Array(m)
    .fill(null)
    .map(() => new Array(n).fill(null).map(() => new Array(5).fill(Infinity)));

const bfs = (start, end) => {
    const [sy, sx, sd] = [start[0] - 1, start[1] - 1, start[2]];
    const [ey, ex, ed] = [end[0] - 1, end[1] - 1, end[2]];
    const queue = [[sx, sy, sd]];
    visit[sy][sx][sd] = 0;
    let idx = 0;

    while (queue.length > idx) {
        const [x, y, d] = queue[idx];
        if (x === ex && y === ey && d === ed) {
            return visit[y][x][d];
        }
        for (let i = 0; i < 5; i++) {
            if (i === 0) {
                let move = 0;
                while (move++ < 3) {
                    const [nx, ny] = [
                        x + dir[0][d] * move,
                        y + dir[1][d] * move,
                    ];
                    if (nx < 0 || ny < 0 || nx >= n || ny >= m) break;
                    if (map[ny][nx] === 1) break;
                    if (visit[ny][nx][d] < visit[y][x][d] + 1) break;
                    visit[ny][nx][d] = visit[y][x][d] + 1;
                    queue.push([nx, ny, d]);
                }
            } else {
                const nd = i;
                if (
                    d === nd ||
                    (d === 1 && nd === 2) ||
                    (d === 2 && nd === 1) ||
                    (d === 3 && nd === 4) ||
                    (d === 4 && nd === 3)
                )
                    continue;
                if (visit[y][x][nd] < visit[y][x][d] + 1) continue;
                visit[y][x][nd] = visit[y][x][d] + 1;
                queue.push([x, y, nd]);
            }
        }

        idx++;
    }
};

console.log(bfs(b[0], b[1]));
