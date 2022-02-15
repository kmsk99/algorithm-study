// 트리의 높이와 너비

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');
const n = +input[0];
const nodes = input.slice(1).map((v) => v.split(' ').map((x) => +x));
const level = new Array(n + 1);
let result = [0, 0];

class Node {
    constructor(data) {
        this.data = data;
        this.pos = null;
        this.depth = null;
        this.left = null;
        this.right = null;
        this.root = null;
    }
}

class Tree {
    constructor(size) {
        this.root = null;
        this.size = size;
        this.count = 1;
        this.depth = 0;
        this.nodes = [null];
        for (let i = 1; i < size + 1; i++) {
            this.addNode(i);
        }
    }

    addNode(data) {
        const newNode = new Node(data);
        this.nodes.push(newNode);
    }

    connect(root, left, right) {
        const rootNode = this.nodes[root];
        const leftNode = this.nodes[left] || null;
        const rightNode = this.nodes[right] || null;

        if (!this.root) {
            this.root = rootNode;
        }

        rootNode.left = leftNode;
        rootNode.right = rightNode;
        if (leftNode) leftNode.root = rootNode;
        if (rightNode) rightNode.root = rootNode;
        this.assignRoot();
    }

    assignRoot() {
        while (this.root.root) {
            this.root = this.root.root;
        }
    }

    inorder(node, depth) {
        if (node) {
            this.inorder(node.left, depth + 1);
            node.pos = this.count++;
            node.depth = depth;
            this.depth = Math.max(depth, this.depth);
            this.inorder(node.right, depth + 1);
        }
    }
}

const tree = new Tree(n);
for (let i = 0; i < n; i++) {
    tree.connect(...nodes[i]);
}
tree.inorder(tree.root, 1);

for (let i = 1; i < n + 1; i++) {
    const current = tree.nodes[i];
    if (!level[current.depth]) {
        level[current.depth] = [current.pos, current.pos, 1];
    } else {
        const [min, max] = [
            Math.min(current.pos, level[current.depth][0]),
            Math.max(current.pos, level[current.depth][1]),
        ];
        level[current.depth] = [min, max, max - min + 1];
    }
}

for (let i = 1; i < tree.depth + 1; i++) {
    if (result[1] < level[i][2]) {
        result = [i, level[i][2]];
    }
}

console.log(result.join(' '));
