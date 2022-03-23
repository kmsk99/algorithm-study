// 숨바꼭질 3

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [n, k] = input.map((x) => +x);

class Queue {
    constructor() {
        this.head = this.tail = null;
    }

    addFront(data) {
        if (!this.head) this.head = this.tail = { data };
        else this.head = this.head.prev = { data, next: this.head };
    }

    addBack(data) {
        if (!this.tail) this.head = this.tail = { data };
        else this.tail = this.tail.next = { data, prev: this.tail };
    }

    popFront() {
        const data = this.head.data;
        if (!this.head) return;
        if (!this.head.next) this.head = this.tail = null;
        else {
            this.head = this.head.next;
            this.head.prev = undefined;
        }
        return data;
    }
}

const bfs = (start = n, end = k) => {
    const queue = new Queue();
    queue.addFront([start, 0]);

    const visit = [];
    visit[start] = true;

    while (queue.head !== null) {
        const [cur, time] = queue.popFront();
        if (cur === end) {
            return time;
        }

        for (let i = -1; i <= 1; i++) {
            if (i === 0) {
                if (cur > end) continue;
                const next = cur * 2;
                if (visit[next]) continue;
                if (next > 100000) continue;
                visit[next] = true;
                queue.addFront([next, time]);
            } else if (i === -1) {
                const next = cur + i;
                if (next < 0) continue;
                if (visit[next]) continue;
                visit[next] = true;
                queue.addBack([next, time + 1]);
            } else if (i === 1) {
                const next = cur + i;
                if (next > end) continue;
                if (visit[next]) continue;
                visit[next] = true;
                queue.addBack([next, time + 1]);
            }
        }
    }
};

console.log(bfs());
