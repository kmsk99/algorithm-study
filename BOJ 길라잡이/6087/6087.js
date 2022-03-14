// 레이저 통신

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [w, h] = input
    .shift()
    .split(' ')
    .map((x) => +x);

const map = input.map((v) => v.split(''));
const nodes = [];
const dir = [
    [1, 0, -1, 0],
    [0, 1, 0, -1],
];

for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
        if (map[y][x] === 'C') {
            nodes.push([x, y]);
        }
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.tail = null;
    }
}

class Qeueu {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    push(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
    }

    unshift(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
    }

    shift() {
        const node = this.head;
        if (!this.head) {
            return null;
        } else if (!this.head.next) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        return node.data;
    }
}

const bfs = (nodes) => {
    const [sx, sy] = nodes[0];
    const [ex, ey] = nodes[1];
    const visit = new Array(h)
        .fill(null)
        .map(() =>
            new Array(w).fill(null).map(() => new Array(4).fill(Infinity))
        );
    const queue = new Qeueu();
    for (let i = 0; i < 4; i++) {
        queue.push([sx, sy, i, 0]);
        visit[sy][sx][i] = 0;
    }

    while (queue.head !== null) {
        const [cx, cy, cd, ct] = queue.shift();
        if (cx === ex && cy === ey) {
            return visit[cy][cx][cd];
        }
        for (let i = -1; i < 2; i++) {
            if (i === 0) {
                const [nx, ny, nd] = [cx + dir[0][cd], cy + dir[1][cd], cd];
                if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
                if (map[ny][nx] === '*') continue;
                if (visit[ny][nx][nd] <= visit[cy][cx][cd]) continue;
                visit[ny][nx][nd] = visit[cy][cx][cd];
                queue.unshift([nx, ny, nd, 0]);
            } else if (ct === 0) {
                const [nx, ny, nd] = [cx, cy, (cd + i + 4) % 4];
                if (visit[ny][nx][nd] <= visit[cy][cx][cd] + 1) continue;
                visit[ny][nx][nd] = visit[cy][cx][cd] + 1;
                queue.push([nx, ny, nd, 1]);
            }
        }
    }
};

console.log(bfs(nodes));
