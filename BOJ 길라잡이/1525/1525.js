// 퍼즐

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(/\s/);

const a = +input
    .map((x) => {
        if (x === '0') {
            return 9;
        } else return x;
    })
    .join('');

const up = (x) => {
    if (x < 3) return -1;
    else return Math.floor(x / 3 - 1) * 3 + (x % 3);
};
const down = (x) => {
    if (x > 5) return -1;
    else return Math.floor(x / 3 + 1) * 3 + (x % 3);
};
const left = (x) => {
    if (x % 3 === 0) return -1;
    else return Math.floor(x / 3) * 3 + (x % 3) - 1;
};
const right = (x) => {
    if (x % 3 === 2) return -1;
    else return Math.floor(x / 3) * 3 + (x % 3) + 1;
};
const swap = (arr, x, y) => {
    arr = arr.toString().split('');
    [arr[x], arr[y]] = [arr[y], arr[x]];
    return +arr.join('');
};
const end = 123456789;

const command = [up, down, left, right];

const bfs = (arr) => {
    const queue = [arr];
    const visit = [];
    visit[arr] = 0;

    while (queue.length > 0) {
        const carr = queue.shift();
        const czero = carr.toString().indexOf('9');
        if (carr === end) {
            return visit[carr];
        }
        for (let i = 0; i < 4; i++) {
            const nzero = command[i](czero);
            if (nzero === -1) continue;
            const narr = swap(carr, nzero, czero);
            if (visit[narr]) continue;
            visit[narr] = visit[carr] + 1;
            queue.push(narr);
        }
    }

    return -1;
};

console.log(bfs(a));
