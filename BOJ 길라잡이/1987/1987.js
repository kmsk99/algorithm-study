// 알파벳

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [r, c] = input
    .shift()
    .split(' ')
    .map((x) => +x);

const map = input.map((v) => v.split(''));
const visit = new Array(26).fill(false);
const dir = [
    [0, 0, 1, -1],
    [1, -1, 0, 0],
];

const atn = (char) => {
    return char.charCodeAt(0) - 'A'.charCodeAt(0);
};

let max = 0;

const dfs = (current = [0, 0, 1]) => {
    const [cx, cy, cc] = current;
    visit[atn(map[cy][cx])] = true;

    for (let i = 0; i < 4; i++) {
        const [nx, ny, nc] = [cx + dir[0][i], cy + dir[1][i], cc + 1];
        if (nx < 0 || ny < 0 || nx >= c || ny >= r) continue;
        const char = atn(map[ny][nx]);
        if (visit[char]) continue;
        dfs([nx, ny, nc]);
        visit[char] = false;
    }

    max = Math.max(max, cc);
};

dfs();

console.log(max);
