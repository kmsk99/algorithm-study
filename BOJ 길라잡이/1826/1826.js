// 연료 채우기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const [l, p] = input
    .pop()
    .split(' ')
    .map((x) => +x);
const a = input.map((x) => x.split(' ').map((x) => +x));

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    getlc = (x) => 2 * x + 1;
    getrc = (x) => 2 * x + 2;
    getp = (x) => Math.floor((x - 1) / 2);

    insert = (number) => {
        this.heap.push(number);
        this.heapifyUp();
    };

    heapifyUp = () => {
        let idx = this.heap.length - 1;
        const lastNode = this.heap[idx];

        while (true) {
            if (this.heap[this.getp(idx)] < lastNode) {
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
            const biggerChild =
                this.heap[rightChild] &&
                this.heap[rightChild] > this.heap[leftChild]
                    ? rightChild
                    : leftChild;

            if (this.heap[biggerChild] > firstNode) {
                this.heap[idx] = this.heap[biggerChild];
                idx = biggerChild;
            } else break;
        }

        this.heap[idx] = firstNode;
    };
}

a.sort((a, b) => a[0] - b[0]);
let stop = 0;
let distance = 0;
let fuel = p;
let idx = 0;
const pq = new MaxHeap();
while (true) {
    distance += fuel;
    fuel = 0;

    if (distance >= l) {
        break;
    }

    stop++;

    while (a[idx] && a[idx][0] <= distance) {
        pq.insert(a[idx][1]);
        idx++;
    }

    const currentFuel = pq.delete();
    if (currentFuel === 0) {
        stop = -1;
        break;
    }
    fuel += currentFuel;
}

console.log(stop);
