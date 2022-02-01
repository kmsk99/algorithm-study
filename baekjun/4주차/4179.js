// 불!

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

    getNext() {
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
        const newNode = new Node(data);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
            this.size++;
        } else {
            this.tail.setNext(newNode);
            this.tail = newNode;
            this.size++;
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return;
        } else {
            const deletedNode = this.head;
            this.head = deletedNode.getNext();
            this.size--;
            if (this.isEmpty()) {
                this.tail = null;
            }
            return deletedNode;
        }
    }

    peek() {
        if (this.isEmpty()) {
            return;
        } else {
            return this.head;
        }
    }

    isEmpty() {
        return this.size === 0;
    }
}

const array2D = (x, y) => {
    const array = new Array(y);
    for (let i = 0; i < y; i++) {
        array[i] = new Array(x).fill(0);
    }
    return array;
};

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input = `4 4
// ####
// #JF#
// #..#
// #..#`
//     .toString()
//     .trim()
//     .split('\n');

const [yMax, xMax] = input
    .shift()
    .split(' ')
    .map((x) => +x);
const map = [];
const queue = new Queue();
const fire = new Queue();
const qi = array2D(xMax, yMax);
const fi = array2D(xMax, yMax);
const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

const readStage = () => {
    for (let i = 0; i < yMax; i++) {
        map.push(input[i].split(''));
    }

    for (let y = 0; y < yMax; y++) {
        for (let x = 0; x < xMax; x++) {
            if (map[y][x] === 'J') {
                qi[y][x] = 1;
                queue.enqueue([x, y]);
            } else if (map[y][x] === 'F') {
                fi[y][x] = 1;
                fire.enqueue([x, y]);
            }
        }
    }
};

const firebfs = () => {
    while (!fire.isEmpty()) {
        const [cx, cy] = fire.dequeue().data;

        for (let i = 0; i < 4; i++) {
            const nx = cx + dir[i][0];
            const ny = cy + dir[i][1];
            if (nx < 0 || ny < 0 || nx >= xMax || ny >= yMax) continue;
            if (map[ny][nx] === '#' || fi[ny][nx] > 0) continue;
            fi[ny][nx] = fi[cy][cx] + 1;
            fire.enqueue([nx, ny]);
        }
    }
};

const queuebfs = () => {
    while (!queue.isEmpty()) {
        const [cx, cy] = queue.dequeue().data;

        for (let i = 0; i < 4; i++) {
            const nx = cx + dir[i][0];
            const ny = cy + dir[i][1];
            if (nx < 0 || ny < 0 || nx >= xMax || ny >= yMax) {
                return qi[cy][cx];
            }
            if (map[ny][nx] === '#' || qi[ny][nx] > 0) continue;
            if (fi[ny][nx] !== 0 && fi[ny][nx] <= qi[cy][cx] + 1) continue;
            qi[ny][nx] = qi[cy][cx] + 1;
            queue.enqueue([nx, ny]);
        }
    }
    return 'IMPOSSIBLE';
};

readStage();
firebfs();
const result = queuebfs();
console.log(result);
