// 경비행기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, k] = input[0].split(' ').map((x) => +x);
const a = input.slice(1).map((v) => v.split(' ').map((x) => +x));
const visit = new Array(n).fill(false);
const S = [0, 0];
const T = [10000, 10000];

const bfs = (fuel) => {
    const queue = [[0, 0, 0]];
    let idx = 0;

    while (queue.length > idx) {
        const [cx, cy, cc] = queue[idx];
        const target = Math.ceil(
            Math.sqrt(Math.pow(10000 - cx, 2) + Math.pow(10000 - cy, 2)) / 10
        );
        if (target <= fuel) {
            return cc;
        }

        for (let i = 0; i < a.length; i++) {
            const [nx, ny] = a[i];
            if (visit[i]) continue;
            const cost = Math.ceil(
                Math.sqrt(Math.pow(nx - cx, 2) + Math.pow(ny - cy, 2)) / 10
            );
            if (cost > fuel) continue;
            visit[i] = true;
            queue.push([nx, ny, cc + 1]);
        }

        idx++;
    }

    return 1000;
};

let left = 0;
let right = 1500;
let mid;

while (left <= right) {
    mid = Math.floor((left + right) / 2);

    visit.fill(false);

    if (bfs(mid) <= k) {
        right = mid - 1;
    } else {
        left = mid + 1;
    }
}
visit.fill(false);
if (bfs(mid) > k) mid++;
console.log(mid);

// bfs 1000이면 왼쪽을 올려야됨
// bfs 10이면 왼쪽을 올려야됨
// bfs 2이면 오른쪽을 내려야됨
