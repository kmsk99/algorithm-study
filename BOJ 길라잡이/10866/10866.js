// 덱

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input.slice(1).map((x) => x.split(' '));

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class Deque {
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    pushF(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
            this.size = 1;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
            this.size++;
        }
    }

    pushB(data) {
        const node = new Node(data);
        if (!this.tail) {
            this.head = node;
            this.tail = node;
            this.size = 1;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
            this.size++;
        }
    }

    popF() {
        const node = this.head;
        if (!this.head) return -1;
        if (!this.head.next) {
            this.head = null;
            this.tail = null;
            this.size = 0;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
            this.size--;
        }
        return node.data;
    }

    popB() {
        const node = this.tail;
        if (!this.tail) return -1;
        if (!this.tail.prev) {
            this.tail = null;
            this.head = null;
            this.size = 0;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.size--;
        }
        return node.data;
    }

    empty() {
        return this.size === 0 ? 1 : 0;
    }

    front() {
        return this.size === 0 ? -1 : this.head.data;
    }

    back() {
        return this.size === 0 ? -1 : this.tail.data;
    }
}

const deque = new Deque();
const result = [];

for (let i = 0; i < n; i++) {
    switch (a[i][0]) {
        case 'push_front':
            deque.pushF(a[i][1]);
            break;
        case 'push_back':
            deque.pushB(a[i][1]);
            break;
        case 'pop_front':
            result.push(deque.popF());
            break;
        case 'pop_back':
            result.push(deque.popB());
            break;
        case 'size':
            result.push(deque.size);
            break;
        case 'empty':
            result.push(deque.empty());
            break;
        case 'front':
            result.push(deque.front());
            break;
        case 'back':
            result.push(deque.back());
            break;

        default:
            break;
    }
}

console.log(result.join('\n'));
