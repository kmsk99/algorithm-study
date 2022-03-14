// 구간 곱 구하기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));

class Segment {
    constructor(n) {
        this.size = n;
        this.radius = 0;
        this.tree = new Array(n + 1).fill(null).map(() => []);
        for (let i = 0; i < n - 1; i++) {
            const [root, child, len] = a[i];
            this.tree[root].push([child, len]);
        }
    }

    init(node = 1) {
        if (this.tree[node].length === 0) return [0];
        const lens = [];
        for (let i = 0; i < this.tree[node].length; i++) {
            this.tree[node][i][1] =
                Math.max(...this.init(this.tree[node][i][0])) +
                this.tree[node][i][1];
            lens.push(this.tree[node][i][1]);
        }
        lens.sort((a, b) => b - a);
        this.radius = Math.max(this.radius, lens[0] + (lens[1] ? lens[1] : 0));
        return lens;
    }
}

const segment = new Segment(n);
segment.init();

console.log(segment.radius);
