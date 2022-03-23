// 합리적인 이동경로

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const MAX = Number.MAX_SAFE_INTEGER;
const [n, m] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const a = input.map((v) => v.split(' ').map((x) => +x));
const b = new Array(n + 1).fill(null).map(() => []);
const dp = new Array(n + 1).fill(0);
const distance = new Array(n + 1).fill(MAX);

for (let i = 0; i < m; i++) {
    b[a[i][0]].push([a[i][1], a[i][2]]);
    b[a[i][1]].push([a[i][0], a[i][2]]);
}

class MinHeap {
    constructor() {
        this.heap = [null];
    }

    getlc = (x) => 2 * x;
    getrc = (x) => 2 * x + 1;
    getp = (x) => Math.floor(x / 2);
    swap = (x, y) => {
        [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
    };

    insert(pos, dist) {
        this.heap.push({ pos, dist });
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        let node = this.heap[index];

        while (index > 1) {
            const parent = this.getp(index);
            if (this.heap[parent].dist > node.dist) {
                this.swap(parent, index);
                index = parent;
            } else return;
        }
    }

    delete() {
        if (this.heap.length === 1) return;
        const node = this.heap[1];
        if (this.heap.length === 2) {
            this.heap = [null];
        } else {
            this.heap[1] = this.heap.pop();
            this.heapifyDown();
        }
        return node;
    }

    heapifyDown() {
        const size = this.heap.length;
        let index = 1;
        const node = this.heap[index];

        while (this.getlc(index) < size) {
            const lc = this.getlc(index);
            const rc = this.getrc(index);
            const sc =
                rc < size && this.heap[rc].dist < this.heap[lc].dist ? rc : lc;
            if (this.heap[sc].dist < node.dist) {
                this.swap(sc, index);
                index = sc;
            } else return;
        }
    }

    isEmpty() {
        return this.heap.length === 1;
    }
}

const bfs = () => {
    const queue = new MinHeap();
    queue.insert(2, 0);
    distance[2] = 0;
    dp[2] = 1;

    while (!queue.isEmpty()) {
        const { pos: node, dist } = queue.delete();

        if (distance[node] < dist) continue;

        for (const [next, cost] of b[node]) {
            if (distance[next] > dist + cost) {
                distance[next] = dist + cost;
                queue.insert(next, distance[next]);
            }
            if (dist < distance[next]) {
                dp[next] += dp[node];
            }
        }
    }
};

bfs();
// console.log(distance);
console.log(dp[1]);
