// 유기농 배추

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
let input = fs.readFileSync(PATH).toString().trim().split('\n');
const dir = [
    [0, 0, 1, -1],
    [1, -1, 0, 0],
];
const result = [];

let t = +input.shift();
while (t-- !== 0) {
    const [m, n, k] = input
        .shift()
        .split(' ')
        .map((x) => +x);
    const a = input.slice(0, k).map((v) => v.split(' ').map((x) => +x));
    input = input.slice(k);

    const map = new Array(n).fill(null).map(() => new Array(m).fill(0));
    const visit = new Array(n).fill(null).map(() => new Array(m).fill(false));
    a.forEach((v) => {
        map[v[1]][v[0]] = 1;
    });
    let count = 0;

    const bfs = (x, y) => {
        const queue = [[x, y]];
        let idx = 0;

        while (queue.length > idx) {
            const [cx, cy] = queue[idx];
            for (let i = 0; i < 4; i++) {
                const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
                if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
                if (visit[ny][nx]) continue;
                if (map[ny][nx] === 0) continue;
                visit[ny][nx] = true;
                queue.push([nx, ny]);
            }
            idx++;
        }
    };

    for (let y = 0; y < n; y++) {
        for (let x = 0; x < m; x++) {
            if (map[y][x] === 0 || visit[y][x]) continue;
            bfs(x, y);
            count++;
        }
    }

    console.log(count);
}
