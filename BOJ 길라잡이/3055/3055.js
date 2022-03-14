// 탈출

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [r, c] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const map = input.map((v) => v.split(''));
const water = new Array(r).fill(null).map(() => new Array(c).fill(Infinity));
let start, end;
const dir = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
];

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
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    dequeue() {
        const node = this.head;
        if (this.head === null) return;
        if (this.head.next === null) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            node.next = null;
        }
        return node.data;
    }
}

const queue = new Queue();

for (let y = 0; y < r; y++) {
    for (let x = 0; x < c; x++) {
        if (map[y][x] === 'S') {
            start = [x, y];
            water[y][x] = 0;
        } else if (map[y][x] === 'D') {
            end = [x, y];
        } else if (map[y][x] === '*') {
            queue.enqueue([x, y]);
            water[y][x] = 0;
        }
    }
}

const waterbfs = () => {
    while (queue.head !== null) {
        const [cx, cy] = queue.dequeue();
        for (let i = 0; i < 4; i++) {
            const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
            if (nx < 0 || ny < 0 || nx >= c || ny >= r) continue;
            if (map[ny][nx] !== '.') continue;
            if (water[ny][nx] <= water[cy][cx] + 1) continue;
            water[ny][nx] = water[cy][cx] + 1;
            queue.enqueue([nx, ny]);
        }
    }
};

const bfs = (start, end) => {
    queue.enqueue(start);

    while (queue.head !== null) {
        const [cx, cy] = queue.dequeue();
        if (cx === end[0] && cy === end[1]) {
            return water[cy][cx];
        }
        for (let i = 0; i < 4; i++) {
            const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
            if (nx < 0 || ny < 0 || nx >= c || ny >= r) continue;
            if (map[ny][nx] === 'X') continue;
            if (water[ny][nx] <= water[cy][cx] + 1) continue;
            water[ny][nx] = water[cy][cx] + 1;
            queue.enqueue([nx, ny]);
        }
    }

    return 'KAKTUS';
};

waterbfs();
console.log(bfs(start, end));
