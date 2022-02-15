function solution(words, queries) {
    const trie = new Trie();
    for (let i = 0; i < words.length; i++) {
        trie.add(words[i]);
    }

    for (let i = 0; i < queries.length; i++) {
        trie.search(queries[i]);
    }

    return trie.count;
}

class Node {
    constructor() {
        this.isEnd = false;
        this.count = 0;
        this.links = {};
    }
}

class Trie {
    constructor() {
        this.heads = {};
        this.tails = {};
        this.count = [];
    }

    _addHead(node, word) {
        for (let i = 0; i < word.length; i++) {
            node.count++;
            if (i === word.length - 1) {
                node.isEnd = true;
                return;
            }

            if (node.links[word[i]]) {
                node = node.links[word[i]];
            } else {
                node.links[word[i]] = new Node();
                node = node.links[word[i]];
            }
        }
    }

    _addTail(node, word) {
        for (let i = word.length - 1; i >= 0; i--) {
            node.count++;
            if (i === 0) {
                node.isEnd = true;
                return;
            }

            if (node.links[word[i]]) {
                node = node.links[word[i]];
            } else {
                node.links[word[i]] = new Node();
                node = node.links[word[i]];
            }
        }
    }

    add(word) {
        if (!this.heads[word.length]) this.heads[word.length] = new Node();
        if (!this.tails[word.length]) this.tails[word.length] = new Node();
        this._addHead(this.heads[word.length], word);
        this._addTail(this.tails[word.length], word);
    }

    search(word) {
        this.count.push(0);
        const idx = this.count.length - 1;
        if (word[0] === '?') {
            this._searchTail(this.tails[word.length], word, idx);
        } else {
            this._searchHead(this.heads[word.length], word, idx);
        }
    }

    _searchHead(node, word, idx) {
        if (!node) return;

        for (let i = 0; i < word.length; i++) {
            if (word[i] === '?') {
                this.count[idx] += node.count;
                return;
            }

            if (node.links[word[i]]) {
                node = node.links[word[i]];
            } else return;
        }
    }

    _searchTail(node, word, idx) {
        if (!node) return;

        for (let i = word.length - 1; i >= 0; i--) {
            if (word[i] === '?') {
                this.count[idx] += node.count;
                return;
            }

            if (node.links[word[i]]) {
                node = node.links[word[i]];
            } else return;
        }
    }
}
