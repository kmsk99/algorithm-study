// 2048 (Easy)

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));
const dir = [
    [0, -1, 0, 1],
    [-1, 0, 1, 0],
]; // up, left, down, right

const move = (a, idx) => {
    const visit = new Array(n).fill(null).map(() => new Array(3).fill(false));
    const b = new Array(n).fill(null);
    for (let i = 0; i < n; i++) {
        b[i] = a[i].slice();
    }

    const pick = (b, cx, cy, dir) => {
        while (true) {
            let [nx, ny] = [cx + dir[0][idx], cy + dir[1][idx]];
            if (nx < 0 || ny < 0 || nx >= n || ny >= n) break;
            if (b[ny][nx] === 0) {
                b[ny][nx] = b[cy][cx];
                b[cy][cx] = 0;
            } else if (b[ny][nx] === b[cy][cx]) {
                if (visit[cy][cx]) break;
                if (visit[ny][nx]) break;
                visit[ny][nx] = true;
                b[ny][nx] += b[cy][cx];
                b[cy][cx] = 0;
            } else break;
            [cx, cy] = [nx, ny];
        }
    };

    if (idx === 0) {
        for (let y = 0; y < n; y++) {
            for (let x = 0; x < n; x++) {
                pick(b, x, y, dir);
            }
        }
    } else if (idx === 1) {
        for (let x = 0; x < n; x++) {
            for (let y = 0; y < n; y++) {
                pick(b, x, y, dir);
            }
        }
    } else if (idx === 2) {
        for (let y = n - 1; y >= 0; y--) {
            for (let x = 0; x < n; x++) {
                pick(b, x, y, dir);
            }
        }
    } else if (idx === 3) {
        for (let x = n - 1; x >= 0; x--) {
            for (let y = 0; y < n; y++) {
                pick(b, x, y, dir);
            }
        }
    }

    return b;
};

const dfs = (array = a, level = 5) => {
    const result = [];

    if (level === 0) {
        let max = 0;
        for (let y = 0; y < n; y++) {
            for (let x = 0; x < n; x++) {
                if (max < array[y][x]) max = array[y][x];
            }
        }
        return max;
    }

    for (let i = 0; i < 4; i++) {
        result.push(dfs(move(array, i), level - 1));
    }

    return Math.max(...result);
};

console.log(dfs());
