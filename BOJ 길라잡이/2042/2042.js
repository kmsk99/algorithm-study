// 구간 합 구하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m, k] = input[0].split(' ').map((x) => +x);
const a = [0, ...input.slice(1, n + 1).map((x) => BigInt(x))];
const b = input.slice(n + 1).map((v) => v.split(' ').map((x) => BigInt(x)));

class Segment {
    constructor(size) {
        this.tree = [null];
        this.start = 1;
        this.end = size;
    }

    init(start = this.start, end = this.end, node = 1) {
        if (start === end) {
            this.tree[node] = a[start];
            return this.tree[node];
        }
        const mid = Math.floor((start + end) / 2);
        this.tree[node] =
            this.init(start, mid, node * 2) +
            this.init(mid + 1, end, node * 2 + 1);
        return this.tree[node];
    }

    sum(left, right, start = this.start, end = this.end, node = 1) {
        if (left > end || right < start) return 0n;
        if (left <= start && end <= right) return this.tree[node];
        const mid = Math.floor((start + end) / 2);
        return (
            this.sum(left, right, start, mid, node * 2) +
            this.sum(left, right, mid + 1, end, node * 2 + 1)
        );
    }

    update(index, diff, start = this.start, end = this.end, node = 1) {
        if (index > end || index < start) return;
        this.tree[node] += diff;
        if (start === end) return;
        const mid = Math.floor((start + end) / 2);
        this.update(index, diff, start, mid, node * 2);
        this.update(index, diff, mid + 1, end, node * 2 + 1);
    }
}

const segment = new Segment(n);

segment.init();
const result = [];

for (let i = 0; i < m + k; i++) {
    const [x, y, z] = b[i];
    if (x === 1n) {
        segment.update(y, z - a[y]);
        a[y] = z;
    } else if (x === 2n) {
        result.push(segment.sum(y, z));
    }
}

console.log(result.join('\n'));
