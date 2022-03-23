// 미네랄

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [r, c] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const b = input
    .pop()
    .split(' ')
    .map((x) => +x);
const n = +input.pop();
const a = input.map((x) => x.split(''));

const dir = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
];

const down = () => {
    const visit = new Array(r).fill(null).map(() => new Array(c).fill(false));
    const queue = [];

    for (let x = 0; x < c; x++) {
        if (a[r - 1][x] === '.') continue;
        if (visit[r - 1][x]) continue;
        queue.push([x, r - 1]);
        visit[r - 1][x] = true;
        while (queue.length > 0) {
            const [cx, cy] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
                if (nx < 0 || ny < 0 || nx >= c || ny >= r) continue;
                if (a[ny][nx] === '.') continue;
                if (visit[ny][nx]) continue;
                visit[ny][nx] = true;
                queue.push([nx, ny]);
            }
        }
    }

    const moving = [];
    let canMove = false;

    for (let y = r - 2; y >= 0; y--) {
        for (let x = 0; x < c; x++) {
            if (visit[y][x]) continue;
            if (a[y][x] === '.') continue;
            moving.push([x, y]);
            canMove = true;
        }
    }

    while (canMove) {
        for (let i = 0; i < moving.length; i++) {
            const [cx, cy] = moving[i];
            if (cy + 1 === r || visit[cy + 1][cx]) {
                canMove = false;
                break;
            }
        }
        if (!canMove) break;
        for (let i = 0; i < moving.length; i++) {
            const [cx, cy] = moving[i];
            [a[cy][cx], a[cy + 1][cx]] = [a[cy + 1][cx], a[cy][cx]];
            moving[i] = [cx, cy + 1];
        }
    }
};

const stick = (height, lr) => {
    height = r - height;
    if (lr === 0) {
        for (let x = 0; x < c; x++) {
            if (a[height][x] === 'x') {
                a[height][x] = '.';
                break;
            }
        }
    } else {
        for (let x = c - 1; x >= 0; x--) {
            if (a[height][x] === 'x') {
                a[height][x] = '.';
                break;
            }
        }
    }
};

for (let i = 0; i < n; i++) {
    stick(b[i], i % 2);
    down();
}

console.log(a.map((v) => v.join('')).join('\n'));
