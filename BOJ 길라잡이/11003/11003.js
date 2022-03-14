// 최솟값 찾기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs
    .readFileSync(PATH)
    .toString()
    .trim()
    .split('\n')
    .map((v) => v.split(' ').map((x) => +x));

const [n, l] = input[0];
const a = input[1];

class Deque {
    constructor() {
        this.front = this.back = undefined;
    }

    addFront(value) {
        if (!this.front) this.front = this.back = { value };
        else this.front = this.front.next = { value, prev: this.front };
    }

    removeFront() {
        let value = this.peekFront();
        if (this.front === this.back) this.front = this.back = undefined;
        else (this.front = this.front.prev).next = undefined;
        return value;
    }

    peekFront() {
        return this.front && this.front.value;
    }

    addBack(value) {
        if (!this.front) this.front = this.back = { value };
        else this.back = this.back.prev = { value, next: this.back };
    }

    removeBack() {
        let value = this.peekBack();
        if (this.front === this.back) this.front = this.back = undefined;
        else (this.back = this.back.next).back = undefined;
        return value;
    }

    peekBack() {
        return this.back && this.back.value;
    }
}

const queue = new Deque(l);

let answer = '';

for (let i = 0; i < n; i++) {
    if (queue.peekFront() < i - l + 1) {
        queue.removeFront();
    }

    while (a[queue.peekBack()] >= a[i]) {
        queue.removeBack();
    }

    queue.addBack(i);

    answer += a[queue.peekFront()] + ' ';
    if (i % 10000 === 0) {
        process.stdout.write(answer);
        answer = '';
    }
}

console.log(answer.trimEnd());
