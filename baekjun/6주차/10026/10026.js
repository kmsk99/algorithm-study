// 적록색약

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const size = +input.shift();
const map = input.map((x) => x.split(''));
const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

const mark = [];
for (let i = 0; i < size; i++) {
    mark.push(new Array(size).fill(0));
}

function normal() {
    mark.forEach((v) => v.fill(0));
    const queue = [];
    let count = 0;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (mark[y][x] !== 0) continue;
            count++;
            queue.push([x, y]);
            mark[y][x] = count;
            const color = map[y][x];
            while (queue.length !== 0) {
                const [cx, cy] = queue.shift();
                for (let i = 0; i < 4; i++) {
                    const nx = cx + dir[i][0];
                    const ny = cy + dir[i][1];
                    if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
                    if (mark[ny][nx] !== 0) continue;
                    if (map[ny][nx] !== color) continue;
                    mark[ny][nx] = count;
                    queue.push([nx, ny]);
                }
            }
        }
    }
    return count;
}

function redGreen() {
    mark.forEach((v) => v.fill(0));
    const queue = [];
    let count = 0;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (mark[y][x] !== 0) continue;
            count++;
            queue.push([x, y]);
            mark[y][x] = count;
            const color = map[y][x];
            while (queue.length !== 0) {
                const [cx, cy] = queue.shift();
                for (let i = 0; i < 4; i++) {
                    const nx = cx + dir[i][0];
                    const ny = cy + dir[i][1];
                    if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
                    if (mark[ny][nx] !== 0) continue;
                    if (
                        (map[ny][nx] === 'B' && color !== 'B') ||
                        (map[ny][nx] !== 'B' && color === 'B')
                    )
                        continue;
                    mark[ny][nx] = count;
                    queue.push([nx, ny]);
                }
            }
        }
    }
    return count;
}

const n = normal();
const m = redGreen();
console.log(n + ' ' + m);
