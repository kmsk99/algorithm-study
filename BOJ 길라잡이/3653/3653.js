// 영화 수집

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

let t = +input.shift();

class Segment {
    constructor(array) {
        this.tree = [null];
        this.size = array.length - 1;
        this.array = array;
    }

    init(start = 1, end = this.size, node = 1) {
        if (start === end) return (this.tree[node] = this.array[start]);
        const mid = Math.floor((start + end) / 2);
        return (this.tree[node] =
            this.init(start, mid, node * 2) +
            this.init(mid + 1, end, node * 2 + 1));
    }

    sum(left, right, start = 1, end = this.size, node = 1) {
        if (end < left || right < start) return 0;
        if (left <= start && end <= right) return this.tree[node];
        const mid = Math.floor((start + end) / 2);
        return (
            this.sum(left, right, start, mid, node * 2) +
            this.sum(left, right, mid + 1, end, node * 2 + 1)
        );
    }

    change(idx, diff, start = 1, end = this.size, node = 1) {
        if (idx < start || end < idx) return;
        this.tree[node] += diff;
        if (start === end) return;
        const mid = Math.floor((start + end) / 2);
        this.change(idx, diff, start, mid, node * 2);
        this.change(idx, diff, mid + 1, end, node * 2 + 1);
    }
}

while (t-- > 0) {
    const [n, m] = input
        .shift()
        .split(' ')
        .map((x) => +x);
    const a = input
        .shift()
        .split(' ')
        .map((x) => +x);

    const b = new Array(n + m + 1).fill(0);
    const index = new Array(n + 1);
    for (let i = 1; i <= n; i++) {
        b[i + m] = 1;
        index[i] = i + m;
    }
    const segment = new Segment(b);
    segment.init();
    const result = [];

    for (let i = 0; i < m; i++) {
        result.push(segment.sum(1, index[a[i]] - 1));
        segment.change(index[a[i]], -1);
        index[a[i]] = m - i;
        segment.change(index[a[i]], 1);
    }

    console.log(result.join(' '));
}
