// 이모티콘

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = +fs.readFileSync(PATH).toString().trim();

const bfs = (end) => {
    const queue = [[1, 0, 0]];
    const visit = new Array(2001).fill(null).map(() => new Array(1000));
    visit[1][0] = true;
    let idx = 0;

    while (idx < queue.length) {
        const [cur, clip, time] = queue[idx];
        if (cur === end) {
            return time;
        }

        for (let i = 0; i < 3; i++) {
            if (i === 0) {
                queue.push([cur, cur, time + 1]);
            } else if (i == 1) {
                const next = cur + clip;
                if (next > end) continue;
                if (visit[next][clip]) continue;
                visit[next][clip] = true;
                queue.push([next, clip, time + 1]);
            } else if (i === 2) {
                const next = cur - 1;
                if (next < 0) continue;
                if (visit[next][clip]) continue;
                visit[next][clip] = true;
                queue.push([next, clip, time + 1]);
            }
        }

        idx++;
    }
};

console.log(bfs(input));
