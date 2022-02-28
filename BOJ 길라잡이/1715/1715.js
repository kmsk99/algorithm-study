// 카드 정렬하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const a = input.slice(1).map((x) => +x);
let count = 0;

class MinHeap {
    constructor() {
        this.heap = [];
    }

    getLeftChild(x) {
        return 2 * x + 1;
    }

    getRightChild(x) {
        return 2 * x + 2;
    }

    getParent(x) {
        return Math.floor((x - 1) / 2);
    }

    add(data) {
        this.heap.push(data);
        this.heapifyUp();
    }

    heapifyUp() {
        let current = this.heap.length - 1;
        const lastInsertedNode = this.heap[current];

        while (current > 0) {
            const parentIndex = this.getParent(current);

            if (this.heap[parentIndex] > lastInsertedNode) {
                this.heap[current] = this.heap[parentIndex];
                current = parentIndex;
            } else break;
        }

        this.heap[current] = lastInsertedNode;
    }

    pop() {
        const count = this.heap.length;
        const rootNode = this.heap[0];

        if (count <= 0) {
            return 0;
        }
        if (count === 1) this.heap = [];
        else {
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }

        return rootNode;
    }

    heapifyDown() {
        let current = 0;
        const count = this.heap.length;
        const rootNode = this.heap[current];

        while (this.getLeftChild(current) < count) {
            const leftChild = this.getLeftChild(current);
            const rightChild = this.getRightChild(current);

            const smallerChild =
                rightChild < count &&
                this.heap[rightChild] < this.heap[leftChild]
                    ? rightChild
                    : leftChild;

            if (this.heap[smallerChild] <= rootNode) {
                this.heap[current] = this.heap[smallerChild];
                current = smallerChild;
            } else break;
        }

        this.heap[current] = rootNode;
    }
}

const heap = new MinHeap();

for (let i = 0; i < n; i++) {
    heap.add(a[i]);
}

while (heap.heap.length > 1) {
    const num1 = heap.pop();
    const num2 = heap.pop();
    const sum = num1 + num2;
    count += sum;
    heap.add(sum);
}

console.log(count);
