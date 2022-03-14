// Puyo Puyo

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs
    .readFileSync(PATH)
    .toString()
    .trim()
    .split('\n')
    .map((v) => v.split(''));
const [w, h] = [6, 12];
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

const down = () => {
    let flag = true;
    while (flag) {
        flag = false;
        for (let y = h - 1; y > 0; y--) {
            for (let x = 0; x < w; x++) {
                if (input[y][x] === '.' && input[y - 1][x] !== '.') {
                    input[y][x] = input[y - 1][x];
                    input[y - 1][x] = '.';
                    flag = true;
                }
            }
        }
    }
};

let result = 0;

const puyo = () => {
    const visit = new Array(h).fill(null).map(() => new Array(w).fill(false));
    const queue = new Queue();
    let flag = false;

    for (let y = h - 1; y > 0; y--) {
        for (let x = 0; x < w; x++) {
            if (input[y][x] !== '.' && !visit[y][x]) {
                queue.enqueue([x, y]);
                visit[y][x] = true;
                const group = [];
                while (queue.head !== null) {
                    const [cx, cy] = queue.dequeue();
                    group.push([cx, cy]);
                    for (let i = 0; i < 4; i++) {
                        const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
                        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
                        if (input[ny][nx] !== input[cy][cx]) continue;
                        if (visit[ny][nx]) continue;
                        visit[ny][nx] = true;
                        queue.enqueue([nx, ny]);
                    }
                }

                if (group.length >= 4) {
                    for (let i = 0; i < group.length; i++) {
                        const [cx, cy] = group[i];
                        input[cy][cx] = '.';
                    }
                    flag = true;
                }
            }
        }
    }
    if (flag) result++;
    down();
    return flag;
};

while (puyo());
console.log(result);
