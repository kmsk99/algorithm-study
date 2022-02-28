// 보석 도둑

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, k] = input[0].split(' ').map((x) => +x);
const a = input.slice(1, 1 + n).map((v) => v.split(' ').map((x) => +x));
const b = input.slice(1 + n).map((x) => +x);

class Heap {
    constructor() {
        this.items = [];
    }

    swap(index1, index2) {
        let temp = this.items[index1];
        this.items[index1] = this.items[index2];
        this.items[index2] = temp;
    }

    parentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    leftChildIndex(index) {
        return index * 2 + 1;
    }

    rightChildIndex(index) {
        return index * 2 + 2;
    }

    parent(index) {
        return this.items[this.parentIndex(index)];
    }

    leftChild(index) {
        return this.items[this.leftChildIndex(index)];
    }

    rightChild(index) {
        return this.items[this.rightChildIndex(index)];
    }

    peek() {
        return this.items[0];
    }

    size() {
        return this.items.length;
    }
}
class MaxHeap extends Heap {
    //bubbleUp
    bubbleUp() {
        let index = this.items.length - 1;
        while (
            this.parent(index) !== undefined &&
            this.parent(index).value < this.items[index].value
        ) {
            this.swap(index, this.parentIndex(index));
            index = this.parentIndex(index);
        }
    }
    //bubbleDown
    bubbleDown() {
        let index = 0;
        while (
            this.leftChild(index) !== undefined &&
            (this.leftChild(index).value > this.items[index].value ||
                (this.rightChild(index) &&
                    this.rightChild(index).value > this.items[index].value))
        ) {
            let biggerIndex = this.leftChildIndex(index);
            if (
                this.rightChild(index) !== undefined &&
                this.rightChild(index).value > this.items[biggerIndex].value
            ) {
                biggerIndex = this.rightChildIndex(index);
            }
            this.swap(index, biggerIndex);
            index = biggerIndex;
        }
    }

    //add
    add(mass, value) {
        this.items[this.items.length] = { mass, value };
        this.bubbleUp();
    }

    //poll
    poll() {
        let item = this.items[0];
        this.items[0] = this.items[this.items.length - 1];
        this.items.pop();
        this.bubbleDown();
        return item;
    }
}

const pq = new MaxHeap();

a.sort((a, b) => b[0] - a[0]);
b.sort((a, b) => a - b);
let total = 0;

for (let i = 0; i < k; i++) {
    const weight = b[i];
    while (true) {
        const item = a.pop();
        if (item && item[0] <= weight) {
            pq.add(item[0], item[1]);
        } else {
            item && a.push(item);
            break;
        }
    }

    const item = pq.poll();
    item && (total += item.value);
}

console.log(total);
