// 굉장한 학생

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));
const b = new Array(n + 1).fill(null).map(() => new Array(3));
const MAX = 500001;

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < n; j++) {
        b[a[i][j]][i] = j + 1;
    }
}

b.sort((a, b) => a[0] - b[0]);

class Segment {
    constructor(size) {
        this.size = size;
        this.tree = [null];
        this.init();
    }

    init(start = 1, end = this.size, node = 1) {
        if (start === end) return (this.tree[node] = MAX);
        const mid = Math.floor((start + end) / 2);
        return (this.tree[node] = Math.min(
            this.init(start, mid, node * 2),
            this.init(mid + 1, end, node * 2 + 1)
        ));
    }

    min(left, right, start = 1, end = this.size, node = 1) {
        if (end < left || right < start) return MAX;
        if (left <= start && end <= right) return this.tree[node];
        const mid = Math.floor((start + end) / 2);
        return Math.min(
            this.min(left, right, start, mid, node * 2),
            this.min(left, right, mid + 1, end, node * 2 + 1)
        );
    }

    update(idx, value, start = 1, end = this.size, node = 1) {
        if (idx < start || end < idx) return this.tree[node];
        if (start === end) return (this.tree[node] = value);
        const mid = Math.floor((start + end) / 2);
        return (this.tree[node] = Math.min(
            this.update(idx, value, start, mid, node * 2),
            this.update(idx, value, mid + 1, end, node * 2 + 1)
        ));
    }
}

const segment = new Segment(n);
let result = 0;

for (let i = 1; i <= n; i++) {
    const [x, y, z] = b[i];
    if (segment.min(1, y) > z) {
        result++;
    }
    segment.update(y, z);
}

console.log(result);
