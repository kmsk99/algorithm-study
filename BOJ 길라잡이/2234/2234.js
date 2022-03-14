// Puyo Puyo

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input.map((v) => v.split(' ').map((x) => +x));
const visit = new Array(m).fill(null).map(() => new Array(n).fill(-1));
const dir = [
    [-1, 0, 1, 0],
    [0, -1, 0, 1],
];

const block = (num) => {
    const answer = [];
    for (let i = 0; i < 4; i++) {
        if ((num & (1 << i)) === 0) {
            answer.push(false);
        } else answer.push(true);
    }

    return answer;
};

const bfs = (start, numbering) => {
    const queue = [start];
    visit[start[1]][start[0]] = numbering;
    let idx = 0;
    let count = 0;

    while (queue.length > idx) {
        const [cx, cy] = queue[idx];
        count++;
        const blocked = block(a[cy][cx]);
        for (let i = 0; i < 4; i++) {
            if (blocked[i]) continue;
            const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
            if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
            if (visit[ny][nx] !== -1) continue;
            visit[ny][nx] = numbering;
            queue.push([nx, ny]);
        }
        idx++;
    }

    return count;
};

let number = 1;
const rooms = [null];

for (let y = 0; y < m; y++) {
    for (let x = 0; x < n; x++) {
        if (visit[y][x] !== -1) continue;
        rooms.push(bfs([x, y], number++));
    }
}

const roomNumber = rooms.length - 1;
const visitNum = new Array(roomNumber + 1)
    .fill(null)
    .map(() => new Array(roomNumber + 1).fill(0));
let answer3 = 0;

for (let y = 0; y < m; y++) {
    for (let x = 0; x < n - 1; x++) {
        const cur = visit[y][x];
        const right = visit[y][x + 1];

        if (cur !== right && visitNum[cur][right] === 0) {
            visitNum[cur][right] = rooms[cur] + rooms[right];
            if (visitNum[cur][right] > answer3) answer3 = visitNum[cur][right];
        }
    }
}

for (let y = 0; y < m - 1; y++) {
    for (let x = 0; x < n; x++) {
        const cur = visit[y][x];
        const down = visit[y + 1][x];

        if (cur !== down && visitNum[cur][down] === 0) {
            visitNum[cur][down] = rooms[cur] + rooms[down];
            if (visitNum[cur][down] > answer3) answer3 = visitNum[cur][down];
        }
    }
}

console.log(roomNumber);
console.log(Math.max(...rooms.slice(1)));
console.log(answer3);
