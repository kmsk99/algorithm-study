// 토마토

const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n');
// const input = `6 4
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 1`
//     .toString()
//     .trim()
//     .split('\n');

const [xMax, yMax] = input.shift().split(' ');

class Node {
    constructor(data) {
        this.data = data;
        this.nextNode = null;
    }

    setNext(node) {
        if (node instanceof Node || node === null) {
            this.nextNode = node;
        }
    }

    getNext(node) {
        return this.nextNode;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    enqueue(data) {
        const newTail = new Node(data);
        if (this.isEmpty()) {
            this.head = newTail;
            this.tail = newTail;
            this.size++;
        } else {
            this.tail.setNext(newTail);
            this.tail = newTail;
            this.size++;
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return;
        } else {
            const deletedHead = this.head;
            this.head = deletedHead.getNext();
            this.size--;
            if (this.isEmpty()) {
                this.tail = null;
            }
            return deletedHead;
        }
    }

    isEmpty() {
        return this.size === 0;
    }
}

const queue = new Queue();
let space = xMax * yMax;
let maxTime = 0;
const map = [];

for (let y = 0; y < yMax; y++) {
    const row = input[y].split(' ');
    for (let x = 0; x < xMax; x++) {
        const number = Number(row[x]);
        row[x] = number;
        if (number === 1) {
            queue.enqueue([x, y, 1]);
            space--;
        } else if (number === -1) {
            space--;
        }
    }
    map.push(row);
}

const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

while (!queue.isEmpty() && space > 0) {
    const [x, y, day] = queue.dequeue().data;
    maxTime = day;

    for (let i = 0; i < 4; i++) {
        const xPos = x + dir[i][0];
        const yPos = y + dir[i][1];

        if (0 <= xPos && 0 <= yPos && xPos < xMax && yPos < yMax) {
            if (map[yPos][xPos] === 0) {
                map[yPos][xPos] = day + 2;
                queue.enqueue([xPos, yPos, day + 1]);
                space--;
            }
        }
    }
}

if (space > 0) {
    maxTime = -1;
}

console.log(maxTime);
