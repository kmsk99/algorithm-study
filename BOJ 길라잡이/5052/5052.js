// 전화번호 목록

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

let t = +input.shift();
let idx = 0;

class Node {
    constructor() {
        this.next = {};
        this.end = false;
    }
}

class Trie {
    constructor() {
        this.head = {};
    }

    add(string) {
        if (!this.head[string[0]]) this.head[string[0]] = new Node();
        let node = this.head[string[0]];
        for (let i = 1; i < string.length; i++) {
            node = this._add(node, string[i]);
            if (node === false) {
                return false;
            }
        }
        node.end = true;
        return true;
    }

    _add(node, char) {
        if (node.end) return false;
        if (!node.next[char]) {
            node.next[char] = new Node();
        }
        return node.next[char];
    }
}

while (t-- > 0) {
    const n = +input[idx];
    const a = input
        .slice(idx + 1, idx + 1 + n)
        .sort((a, b) => a.length - b.length);
    const trie = new Trie();
    let flag = false;

    for (let i = 0; i < n; i++) {
        if (!trie.add(a[i])) {
            flag = true;
            break;
        }
    }

    console.log(flag ? 'NO' : 'YES');

    idx += n + 1;
}
