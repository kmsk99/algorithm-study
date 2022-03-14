// 안전 영역

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
let max = 0;
const map = input.map((v) =>
    v.split(' ').map((x) => {
        if (max < +x) max = +x;
        return +x;
    })
);
const dir = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
];

const safe = (num) => {
    const visited = new Array(n).fill(null).map(() => new Array(n).fill(false));
    const queue = [];
    let idx = 0;
    let count = 0;

    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            if (map[y][x] > num && !visited[y][x]) {
                queue.push([x, y]);
                count++;
            }
            while (queue.length > idx) {
                const [cx, cy] = queue[idx];
                for (let i = 0; i < 4; i++) {
                    const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
                    if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
                    if (map[ny][nx] <= num) continue;
                    if (visited[ny][nx]) continue;
                    visited[ny][nx] = true;
                    queue.push([nx, ny]);
                }
                idx++;
            }
        }
    }

    return count;
};

let result = 0;
for (let i = 0; i < max; i++) {
    result = Math.max(result, safe(i));
}

console.log(result);
