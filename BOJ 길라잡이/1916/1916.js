// 최소비용 구하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const m = +input.shift();
const a = input.slice(0, m).map((v) => v.split(' ').map((x) => +x));
const [start, end] = input[m].split(' ').map((x) => +x);
const b = new Array(n + 1).fill(null).map(() => []);
const c = new Array(n + 1).fill(Infinity);

for (let i = 0; i < m; i++) {
    const [from, to, cost] = a[i];
    b[from].push({ to, cost });
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    getLeftChild = (x) => 2 * x;
    getRightChild = (x) => 2 * x + 1;
    getParent = (x) => Math.floor((x - 1) / 2);

    swap = (a, b) => {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    };

    size = () => {
        return this.heap.length;
    };

    push = (data) => {
        this.heap.push(data);
        this.heapifyUp();
    };

    heapifyUp = () => {
        let index = this.size() - 1;
        const lastNode = this.heap[index];

        while (index > 0) {
            if (this.heap[this.getParent(index)].cost > lastNode.cost) {
                this.swap(this.getParent(index), index);
                index = this.getParent(index);
            } else break;
        }
    };

    pop = () => {
        const node = this.heap[0];
        if (this.size() === 0) return null;
        if (this.size() === 1) this.heap = [];
        else {
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        return node;
    };

    heapifyDown = () => {
        let index = 0;
        const rootNode = this.heap[index];
        const size = this.size();

        while (this.getLeftChild(index) < size) {
            const leftChildIndex = this.getLeftChild(index);
            const rightChildIndex = this.getRightChild(index);
            const smallerChildIndex =
                this.heap[rightChildIndex] &&
                this.heap[rightChildIndex].cost < this.heap[leftChildIndex].cost
                    ? rightChildIndex
                    : leftChildIndex;

            if (this.heap[smallerChildIndex].cost < rootNode.cost) {
                this.swap(smallerChildIndex, index);
                index = smallerChildIndex;
            } else break;
        }
    };
}

const bfs = (start) => {
    const queue = new MinHeap();
    queue.push({ to: start, cost: 0 });
    c[start] = 0;

    while (queue.size() > 0) {
        const { to, cost } = queue.pop();
        if (c[to] < cost) continue;
        const next = b[to];
        for (let i = 0; i < next.length; i++) {
            if (c[next[i].to] > c[to] + next[i].cost) {
                c[next[i].to] = c[to] + next[i].cost;
                queue.push({ to: next[i].to, cost: c[next[i].to] });
            }
        }
    }
};

bfs(start);
const result = c[end];
console.log(result);
