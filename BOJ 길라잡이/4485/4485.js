// 녹색 옷 입은 애가 젤다지?

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

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

const dir = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
];

let index = 0;
let count = 1;
while (input[index] !== '0') {
    const n = +input[index];
    const a = input
        .slice(index + 1, index + 1 + n)
        .map((v) => v.split(' ').map((x) => +x));
    index += n + 1;

    const dist = new Array(n).fill(null).map(() => new Array(n).fill(Infinity));

    const bfs = () => {
        const queue = new MinHeap();
        queue.push({ xy: [0, 0], cost: a[0][0] });
        dist[0][0] = a[0][0];

        while (queue.size() > 0) {
            const { xy, cost } = queue.pop();
            const [cx, cy] = xy;
            if (dist[cy][cx] < cost) continue;

            for (let i = 0; i < 4; i++) {
                const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
                if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
                if (dist[ny][nx] > dist[cy][cx] + a[ny][nx]) {
                    dist[ny][nx] = dist[cy][cx] + a[ny][nx];
                    queue.push({ xy: [nx, ny], cost: dist[ny][nx] });
                }
            }
        }
    };

    const back = bfs();
    console.log(`Problem ${count++}: ${dist[n - 1][n - 1]}`);
}
