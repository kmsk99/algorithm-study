// 음주 코딩

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

class Segment {
    constructor(array) {
        this.tree = [null];
        this.size = array.length;
        this.array = [null, ...array];
    }

    convert(num) {
        if (num > 0) {
            return 1;
        } else if (num === 0) {
            return 0;
        } else if (num < 0) {
            return -1;
        }
    }

    init(start = 1, end = this.size, node = 1) {
        if (start === end)
            return (this.tree[node] = this.convert(this.array[start]));
        const mid = Math.floor((start + end) / 2);
        return (this.tree[node] =
            this.init(start, mid, node * 2) *
            this.init(mid + 1, end, node * 2 + 1));
    }

    print(left, right, start = 1, end = this.size, node = 1) {
        if (end < left || right < start) return 1;
        if (left <= start && end <= right) return this.tree[node];
        const mid = Math.floor((start + end) / 2);
        return (
            this.print(left, right, start, mid, node * 2) *
            this.print(left, right, mid + 1, end, node * 2 + 1)
        );
    }

    update(idx, diff, start = 1, end = this.size, node = 1) {
        if (idx < start || end < idx) return this.tree[node];
        if (start === end) return (this.tree[node] = this.convert(diff));
        const mid = Math.floor((start + end) / 2);
        return (this.tree[node] =
            this.update(idx, diff, start, mid, node * 2) *
            this.update(idx, diff, mid + 1, end, node * 2 + 1));
    }
}

let idx = 0;

while (input[idx]) {
    const [n, k] = input[idx].split(' ').map((x) => +x);
    const a = input[idx + 1].split(' ').map((x) => +x);
    const b = input.slice(idx + 2, idx + k + 2).map((v) => v.split(' '));
    const result = [];

    const segment = new Segment(a);
    segment.init();

    for (let i = 0; i < k; i++) {
        const [x, y, z] = b[i];
        if (x === 'C') {
            segment.update(+y, +z);
        } else if (x === 'P') {
            const sign = segment.print(+y, +z);
            if (sign === 0) {
                result.push(0);
            } else if (sign === 1) {
                result.push('+');
            } else {
                result.push('-');
            }
        }
    }

    console.log(result.join(''));

    idx += k + 2;
}
