// 사탕상자

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const order = input.map((v) => v.split(' ').map((x) => +x));

class Segment {
    constructor() {
        this.tree = [null];
        this.size = 1000000;
    }

    sum(left, right, start = 1, end = this.size, node = 1) {
        if (end < left || right < start) return 0;
        if (left <= start && end <= right)
            return this.tree[node] ? this.tree[node] : 0;
        const mid = Math.floor((start + end) / 2);
        return (
            this.sum(left, right, start, mid, node * 2) +
            this.sum(left, right, mid + 1, end, node * 2 + 1)
        );
    }

    change(idx, diff, start = 1, end = this.size, node = 1) {
        if (idx < start || end < idx) return;
        if (this.tree[node]) this.tree[node] += diff;
        else this.tree[node] = diff;
        if (start === end) return;
        const mid = Math.floor((start + end) / 2);
        this.change(idx, diff, start, mid, node * 2);
        this.change(idx, diff, mid + 1, end, node * 2 + 1);
    }
}
const segment = new Segment();
const result = [];

for (let i = 0; i < n; i++) {
    const [a, b, c] = order[i];
    if (a === 1) {
        let left = 1;
        let right = 1000000;
        let mid;

        while (left <= right) {
            mid = Math.floor((left + right) / 2);

            if (segment.sum(1, mid) < b) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        segment.change(left, -1);
        result.push(left);
    } else if (a === 2) {
        segment.change(b, c);
    }
}

console.log(result.join('\n'));
