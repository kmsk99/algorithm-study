// 최솟값과 최댓값

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map((x) => +x);
const a = [0, ...input.slice(1, n + 1).map((x) => +x)];
const b = input.slice(n + 1).map((v) => v.split(' ').map((x) => +x));

class Segment {
    constructor(size) {
        this.tree = [null];
        this.end = size;
    }

    init(start = 1, end = this.end, node = 1) {
        if (start === end) {
            this.tree[node] = [a[start], a[start]];
            return this.tree[node];
        }
        const mid = Math.floor((start + end) / 2);
        const left = this.init(start, mid, node * 2);
        const right = this.init(mid + 1, end, node * 2 + 1);
        this.tree[node] = [
            Math.min(left[0], right[0]),
            Math.max(left[1], right[1]),
        ];
        return this.tree[node];
    }

    minMax(left, right, start = 1, end = this.end, node = 1) {
        if (end < left || right < start) return;
        if (left <= start && end <= right) return this.tree[node];
        const mid = Math.floor((start + end) / 2);
        const leftm = this.minMax(left, right, start, mid, node * 2);
        const rightm = this.minMax(left, right, mid + 1, end, node * 2 + 1);
        const result = [
            Math.min(
                leftm ? leftm[0] : Infinity,
                rightm ? rightm[0] : Infinity
            ),
            Math.max(leftm ? leftm[1] : 0, rightm ? rightm[1] : 0),
        ];
        return result;
    }
}

const segment = new Segment(n);
segment.init();

const result = [];

for (let i = 0; i < m; i++) {
    const [l, r] = b[i];
    result.push(segment.minMax(l, r).join(' '));
}

console.log(result.join('\n'));
