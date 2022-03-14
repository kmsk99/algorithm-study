// 공장

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input
    .shift()
    .split(' ')
    .map((x) => +x);
const b = input
    .shift()
    .split(' ')
    .map((x) => +x);

class Segment {
    constructor(size) {
        this.tree = [null];
        this.end = size;
    }

    init(start = 1, end = this.end, node = 1) {
        if (start === end) return (this.tree[node] = 0);
        const mid = Math.floor((start + end) / 2);
        return (this.tree[node] =
            this.init(start, mid, node * 2) +
            this.init(mid + 1, end, node * 2 + 1));
    }

    sum(left, right, start = 1, end = this.end, node = 1) {
        if (end < left || right < start) return 0;
        if (left <= start && end <= right) return this.tree[node];
        const mid = Math.floor((start + end) / 2);
        return (
            this.sum(left, right, start, mid, node * 2) +
            this.sum(left, right, mid + 1, end, node * 2 + 1)
        );
    }

    add(idx, diff = 1, start = 1, end = this.end, node = 1) {
        if (idx < start || idx > end) return;
        this.tree[node] += diff;
        if (start === end) return;
        const mid = Math.floor((start + end) / 2);
        this.add(idx, diff, start, mid, node * 2);
        this.add(idx, diff, mid + 1, end, node * 2 + 1);
    }
}

const visit = new Segment(n);
visit.init();

const hash = {};

for (let i = 0; i < n; i++) {
    hash[b[i]] = i + 1;
}

let sum = 0;
for (let i = 0; i < n; i++) {
    visit.add(hash[a[i]]);
    sum += visit.sum(hash[a[i]] + 1, n);
}

console.log(sum);
