// 숨바꼭질 4

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [n, k] = input.map((x) => +x);

const bfs = (start, end) => {
    const queue = [[start, 0, -1]];
    const visit = [];
    let idx = 0;

    while (queue.length > idx) {
        const [cur, time, prev] = queue[idx];
        visit[cur] = true;

        if (cur === end) {
            const result = [cur];
            let index = prev;
            while (index !== -1) {
                const [pos, t, prevIdx] = queue[index];
                result.push(pos);
                index = prevIdx;
            }

            return [time, result.reverse().join(' ')].join('\n');
        }

        for (let i = -1; i <= 1; i++) {
            if (i === 0) {
                if (cur > end) continue;
                const next = 2 * cur;
                if (visit[next]) continue;
                queue.push([next, time + 1, idx]);
            } else if (i === -1) {
                const next = cur + i;
                if (next < 0) continue;
                if (visit[next]) continue;
                queue.push([next, time + 1, idx]);
            } else if (i === 1) {
                const next = cur + i;
                if (next > end) continue;
                if (visit[next]) continue;
                queue.push([next, time + 1, idx]);
            }
        }

        idx++;
    }

    return [min, count];
};

console.log(bfs(n, k));
