// 두 동전

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input.map((v) => v.split(''));
const dir = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
];

let coin = 0;
let coinPos = [];

for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
        if (a[y][x] === 'o') {
            coinPos[coin++] = [x, y];
        }
    }
}

const bfs = () => {
    const queue = [[...coinPos, 0]];
    let idx = 0;

    while (queue.length > idx) {
        const [[cx1, cy1], [cx2, cy2], time] = queue[idx];
        if (time >= 10) return -1;

        for (let i = 0; i < 4; i++) {
            let [nx1, ny1] = [cx1 + dir[0][i], cy1 + dir[1][i]];
            let [nx2, ny2] = [cx2 + dir[0][i], cy2 + dir[1][i]];
            let [drop1, drop2] = [false, false];
            if (nx1 < 0 || ny1 < 0 || nx1 >= m || ny1 >= n) drop1 = true;
            if (nx2 < 0 || ny2 < 0 || nx2 >= m || ny2 >= n) drop2 = true;
            if (drop1 && drop2) continue;
            if (drop1 ^ drop2) return time + 1;
            if (a[ny1][nx1] === '#') [nx1, ny1] = [cx1, cy1];
            if (a[ny2][nx2] === '#') [nx2, ny2] = [cx2, cy2];
            if (nx1 === nx2 && ny1 === ny2) continue;
            queue.push([[nx1, ny1], [nx2, ny2], time + 1]);
        }

        idx++;
    }
};

console.log(bfs());
