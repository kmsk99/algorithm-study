// DSLR

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const t = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));

const d = (num) => {
    return (num * 2) % 10000;
};

const s = (num) => {
    return (num + 9999) % 10000;
};

const l = (num) => {
    return Math.floor(((num * 10) % 10000) + num / 1000);
};

const r = (num) => {
    return Math.floor(((num * 1000) % 10000) + num / 10);
};

const fun = [d, s, l, r];
const funs = ['D', 'S', 'L', 'R'];

const bfs = (start, end) => {
    const queue = [[start, -1, -1]];
    const visit = [];
    let idx = 0;

    while (queue.length > idx) {
        const [cur, command, prev] = queue[idx];
        if (cur === end) {
            const answer = [funs[command]];
            for (let i = prev; i !== -1; i = queue[i][2]) {
                answer.push(funs[queue[i][1]]);
            }
            return answer.reverse().join('');
        }
        for (let i = 0; i < 4; i++) {
            const next = fun[i](cur);
            if (visit[next]) continue;
            visit[next] = true;
            queue.push([next, i, idx]);
            if (next === end) idx = queue.length - 2;
        }
        idx++;
    }
};

const result = [];
for (let i = 0; i < t; i++) {
    result.push(bfs(...a[i]));
}

console.log(result.join('\n'));
