// 숨바꼭질 2

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [n, k] = input.map((x) => +x);

const bfs = (start, end) => {
    const queue = [[start, 0]];
    const visit = [];
    let idx = 0;
    let count = 0;
    let min = Infinity;

    while (queue.length > idx) {
        const [cur, time] = queue[idx];
        visit[cur] = true;

        if (time > min) break;
        if (cur === end) {
            min = time;
            count++;
        }

        for (let i = -1; i <= 1; i++) {
            if (i === 0) {
                if (cur > end) continue;
                const next = 2 * cur;
                if (visit[next]) continue;
                queue.push([next, time + 1]);
            } else if (i === -1) {
                const next = cur + i;
                if (next < 0) continue;
                if (visit[next]) continue;
                queue.push([next, time + 1]);
            } else if (i === 1) {
                const next = cur + i;
                if (next > end) continue;
                if (visit[next]) continue;
                queue.push([next, time + 1]);
            }
        }

        idx++;
    }

    return [min, count];
};

console.log(bfs(n, k).join(' '));
