// 1로 만들기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = +fs.readFileSync(PATH).toString().trim();
const visit = {};

const bfs = (cur) => {
    const queue = [[cur, 0]];
    visit[cur] = true;
    let idx = 0;

    while (queue.length > idx) {
        const [current, count] = queue[idx];
        if (current === 1) {
            console.log(count);
            break;
        }
        if (current % 3 === 0 && !visit[current / 3]) {
            visit[current / 3] = true;
            queue.push([current / 3, count + 1]);
        }
        if (current % 2 === 0 && !visit[current / 2]) {
            visit[current / 3] = true;
            queue.push([current / 2, count + 1]);
        }
        if (current > 1 && !visit[current - 1]) {
            visit[current - 1] = true;
            queue.push([current - 1, count + 1]);
        }
        idx++;
    }
};

bfs(input);
