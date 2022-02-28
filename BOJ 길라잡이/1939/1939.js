// 중량제한

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map((x) => +x);
const a = input.slice(1, 1 + M).map((v) => v.split(' ').map((x) => +x));
const [start, end] = input[1 + M].split(' ').map((x) => +x);

const MAX = 1000000001;
const b = new Array(N + 1).fill(null).map(() => []);
const visit = new Array(N + 1).fill(false);

for (let i = 0; i < M; i++) {
    b[a[i][0]].push([a[i][1], a[i][2]]);
    b[a[i][1]].push([a[i][0], a[i][2]]);
}

const bfs = (start, weight) => {
    const queue = [start];
    let idx = 0;
    visit[start] = false;

    while (queue.length > idx) {
        const current = queue[idx];
        if (current === end) {
            return true;
        }

        for (let i = 0; i < b[current].length; i++) {
            const [next, nextWeight] = b[current][i];
            if (visit[next]) continue;
            if (nextWeight < weight) continue;
            visit[next] = true;
            queue.push(next);
        }
        idx++;
    }

    return false;
};

let left = MAX;
let right = 0;
let mid;
for (let i = 0; i < M; i++) {
    if (left > a[i][2]) {
        left = a[i][2];
    }
    if (right < a[i][2]) {
        right = a[i][2];
    }
}

while (left <= right) {
    mid = Math.floor((left + right) / 2);
    visit.fill(false);

    if (bfs(start, mid)) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

visit.fill(false);
if (!bfs(start, mid)) mid--;

console.log(mid);
