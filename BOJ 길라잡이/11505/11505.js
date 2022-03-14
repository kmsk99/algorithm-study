// 구간 곱 구하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m, k] = input[0].split(' ').map((x) => +x);
const a = [null, ...input.slice(1, n + 1).map((x) => BigInt(x))];
const b = input.slice(n + 1).map((v) => v.split(' ').map((x) => BigInt(x)));
const max = 1000000007n;

class Segment {
    constructor(size) {
        this.tree = [null];
        this.end = BigInt(size);
    }

    init(start = 1n, end = this.end, node = 1n) {
        if (start === end) return (this.tree[node] = a[start]);
        const mid = (start + end) / 2n;
        return (this.tree[node] =
            (this.init(start, mid, node * 2n) *
                this.init(mid + 1n, end, node * 2n + 1n)) %
            max);
    }

    sum(left, right, start = 1n, end = this.end, node = 1n) {
        if (end < left || right < start) return 1n;
        if (left <= start && end <= right) return this.tree[node];
        const mid = (start + end) / 2n;
        return (
            (this.sum(left, right, start, mid, node * 2n) *
                this.sum(left, right, mid + 1n, end, node * 2n + 1n)) %
            max
        );
    }

    change(idx, neo, start = 1n, end = this.end, node = 1n) {
        if (idx < start || idx > end) return;
        if (start === end) {
            this.tree[node] = neo;
            while (node > 2) {
                if (node % 2n === 0n) node = node / 2n;
                else node = (node - 1n) / 2n;
                this.tree[node] =
                    (this.tree[2n * node] * this.tree[2n * node + 1n]) % max;
            }
            return;
        }
        const mid = (start + end) / 2n;
        this.change(idx, neo, start, mid, node * 2n);
        this.change(idx, neo, mid + 1n, end, node * 2n + 1n);
    }
}

const segment = new Segment(n);
segment.init();

const result = [];
for (let i = 0; i < m + k; i++) {
    const [x, y, z] = b[i];

    if (x === 1n) {
        a[y] = z;
        segment.change(y, a[y]);
    }
    if (x === 2n) {
        result.push(segment.sum(y, z));
    }
}

console.log(result.join('\n'));
