const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

class Node {
    constructor() {
        this.next = {};
        this.count = 0;
    }
}

class Trie {
    constructor() {
        this.head = new Node();
    }

    addWord(word) {
        const array = word.split('');
        let current = this.head;
        for (let i = 0; i < array.length; i++) {
            if (current.next[array[i]] === undefined) {
                current.next[array[i]] = new Node();
            }
            current = current.next[array[i]];
            current.count++;
        }
    }

    findWord(word) {
        const array = word.split('');
        let current = this.head;
        for (let i = 0; i < array.length; i++) {
            if (current.next[array[i]] === undefined) {
                return 0;
            }
            current = current.next[array[i]];
        }
        return current.count;
    }
}

rl.on('line', function (x) {
    input.push(x);
}).on('close', function () {
    const n = +input[0];
    const k = input.slice(1, n + 1);
    const t = +input[n + 1];
    const w = input.slice(n + 2);

    const trie = new Trie();

    for (let i = 0; i < n; i++) {
        trie.addWord(k[i]);
    }

    const result = [];

    for (let i = 0; i < t; i++) {
        result.push(trie.findWord(w[i]));
    }
    console.log(result.join('\n'));
    process.exit();
});

// trie 문제
