// 숨바꼭질

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim();

const [n, k] = input.split(' ').map((x) => +x);
const visit = {};

const bfs = (pos) => {
    const queue = [];
    queue.push([pos, 0]);
    visit[pos] = true;

    while (queue.length > 0) {
        const [current, count] = queue.shift();
        if (current < 0) continue;
        if (current === k) {
            console.log(count);
            break;
        }
        if (!visit[current + 1] && current < k) {
            visit[current + 1] = true;
            queue.push([current + 1, count + 1]);
        }
        if (!visit[current - 1]) {
            visit[current - 1] = true;
            queue.push([current - 1, count + 1]);
        }
        if (!visit[2 * current] && current < k) {
            visit[2 * current] = true;
            queue.push([2 * current, count + 1]);
        }
    }
};

bfs(n);
