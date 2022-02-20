// 토마토

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(data) {
        const node = new Node(data);
        if (this.head) {
            this.tail.next = node;
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }
    }

    dequeue() {
        const node = this.head.data;
        if (!this.head) return;
        if (!this.head.next) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        return node;
    }

    isEmpty() {
        return this.head === null;
    }
}

const [m, n, h] = input[0].split(' ').map((x) => +x);
const box = new Array(h);
for (let i = 0; i < h; i++) {
    box[i] = input
        .slice(n * i + 1, n * i + n + 1)
        .map((v) => v.split(' ').map((x) => +x));
}
const dir = [
    [1, -1, 0, 0, 0, 0],
    [0, 0, 1, -1, 0, 0],
    [0, 0, 0, 0, 1, -1],
];
const queue = new Queue();
let result;

function start() {
    for (let z = 0; z < h; z++) {
        for (let y = 0; y < n; y++) {
            for (let x = 0; x < m; x++) {
                if (box[z][y][x] === 1) {
                    queue.enqueue([x, y, z]);
                }
            }
        }
    }
}

function process() {
    while (!queue.isEmpty()) {
        const [cx, cy, cz] = queue.dequeue();
        for (let i = 0; i < 6; i++) {
            const [nx, ny, nz] = [
                cx + dir[0][i],
                cy + dir[1][i],
                cz + dir[2][i],
            ];
            if (nx < 0 || ny < 0 || nz < 0 || nx >= m || ny >= n || nz >= h)
                continue;
            if (box[nz][ny][nx] !== 0) continue;
            box[nz][ny][nx] = box[cz][cy][cx] + 1;
            queue.enqueue([nx, ny, nz]);
        }
    }
}

function end() {
    let result = -1;
    for (let z = 0; z < h; z++) {
        for (let y = 0; y < n; y++) {
            for (let x = 0; x < m; x++) {
                if (box[z][y][x] === 0) {
                    return -1;
                }
                result = Math.max(box[z][y][x], result);
            }
        }
    }
    return result - 1;
}

start();
process();
console.log(end());
