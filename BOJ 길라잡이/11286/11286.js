// 절댓값 힙

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input.slice(1).map((x) => +x);

class Heap {
    constructor() {
        this.heap = [];
    }

    getlc = (x) => 2 * x + 1;
    getrc = (x) => 2 * x + 2;
    getp = (x) => Math.floor((x - 1) / 2);

    smallerFirst = (a, b) => {
        if (Math.abs(a) < Math.abs(b)) {
            return true;
        } else if (Math.abs(a) === Math.abs(b)) {
            if (a < b) {
                return true;
            }
        }
        return false;
    };

    insert = (number) => {
        this.heap.push(number);
        this.heapifyUp();
    };

    heapifyUp = () => {
        let idx = this.heap.length - 1;
        const lastNode = this.heap[idx];

        while (true) {
            if (this.smallerFirst(lastNode, this.heap[this.getp(idx)])) {
                this.heap[idx] = this.heap[this.getp(idx)];
                idx = this.getp(idx);
            } else break;
        }

        this.heap[idx] = lastNode;
    };

    delete = () => {
        const firstNode = this.heap[0];
        if (this.heap.length === 0) return 0;
        if (this.heap.length === 1) this.heap = [];
        else {
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        return firstNode;
    };

    heapifyDown = () => {
        const len = this.heap.length;
        const firstNode = this.heap[0];
        let idx = 0;

        while (this.getlc(idx) < len) {
            const leftChild = this.getlc(idx);
            const rightChild = this.getrc(idx);
            const smallerChild =
                this.heap[rightChild] &&
                this.smallerFirst(this.heap[rightChild], this.heap[leftChild])
                    ? rightChild
                    : leftChild;

            if (this.smallerFirst(this.heap[smallerChild], firstNode)) {
                this.heap[idx] = this.heap[smallerChild];
                idx = smallerChild;
            } else break;
        }

        this.heap[idx] = firstNode;
    };
}

const result = [];
const heap = new Heap();
for (let i = 0; i < n; i++) {
    if (a[i] === 0) {
        result.push(heap.delete());
    } else {
        heap.insert(a[i]);
    }
}

console.log(result.join('\n'));
