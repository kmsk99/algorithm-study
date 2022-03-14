// 촌수계산

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
const m = +input.shift();
const b = input.map((v) => v.split(' ').map((x) => +x));

class Node {
    constructor(data) {
        this.data = data;
        this.parent = null;
        this.child = [];
    }
}

class Tree {
    constructor(size) {
        this.size = size;
        this.tree = new Array(size + 1);
        for (let i = 1; i <= this.size; i++) {
            this.tree[i] = new Node(i);
        }
        this.visit = new Array(size + 1).fill(-1);
    }

    link(p, c) {
        this.tree[c].parent = p;
    }

    dfs(node, count = 0) {
        if (!node) return -1;
        if (this.visit[node] !== -1) return this.visit[node] + count;
        this.visit[node] = count;
        return this.dfs(this.tree[node].parent, count + 1);
    }

    dist(x, y) {
        this.dfs(x);
        return this.dfs(y);
    }
}

const tree = new Tree(n);

for (let i = 0; i < m; i++) {
    tree.link(...b[i]);
}

console.log(tree.dist(...a));
