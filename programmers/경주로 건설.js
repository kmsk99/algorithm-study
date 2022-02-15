function solution(board) {
    const size = board.length;
    const costs = new Array(size);
    for (let i = 0; i < size; i++) {
        costs[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            costs[i][j] = new Array(2).fill(Infinity);
        }
    }
    const dir = [
        [1, -1, 0, 0],
        [0, 0, 1, -1],
    ];
    const queue = new Queue();
    let result = Infinity;
    costs[0][0] = [0, 0];
    queue.enqueue([0, 0, 0]);
    queue.enqueue([0, 0, 1]);
    while (!queue.isEmpty()) {
        const [cx, cy, cd] = queue.dequeue();
        for (let i = 0; i < 4; i++) {
            const nx = cx + dir[0][i];
            const ny = cy + dir[1][i];
            const nd = Math.abs(dir[0][i]);
            let cost;
            if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
            if (board[ny][nx] === 1) continue;
            if (nd === cd) {
                cost = costs[cy][cx][cd] + 100;
            } else {
                cost = costs[cy][cx][cd] + 600;
            }
            if (costs[ny][nx][nd] < cost) continue;
            costs[ny][nx][nd] = cost;
            queue.enqueue([nx, ny, nd]);
        }
    }

    return Math.min(...costs[size - 1][size - 1]);
}

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(data) {
        const node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    dequeue() {
        const node = this.head;
        if (this.head.next === null) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        return node.data;
    }

    isEmpty() {
        return this.head === null;
    }
}
