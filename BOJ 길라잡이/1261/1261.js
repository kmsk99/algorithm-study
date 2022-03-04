// 알고스팟

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [m, n] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input.map((v) => v.split('').map((x) => +x));
const dp = new Array(n).fill(null).map(() => new Array(m).fill(Infinity));
const dir = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
];
dp[0][0] = 0;

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    unshift = (data) => {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
    };

    push = (data) => {
        const node = new Node(data);
        if (!this.tail) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
    };

    shift = () => {
        const node = this.head;
        if (!this.head) return null;
        if (!this.head.next) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        return node.data;
    };
}

const bfs = () => {
    const queue = new Queue();
    queue.push([0, 0]);

    while (queue.head !== null) {
        const [cx, cy] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
            if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
            if (dp[ny][nx] <= dp[cy][cx] + a[ny][nx]) continue;
            dp[ny][nx] = dp[cy][cx] + a[ny][nx];
            if (a[ny][nx] === 0) {
                queue.unshift([nx, ny]);
            } else if (a[ny][nx] === 1) {
                queue.push([nx, ny]);
            }
        }
    }
};

bfs();
console.log(dp[n - 1][m - 1]);
