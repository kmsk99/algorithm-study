// 요세푸스 문제

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
// const input = '7 3'.toString().trim().split(' ');

class Node {
    constructor(data) {
        this.data = data;
        this.head = null;
        this.tail = null;
    }

    setHead(node) {
        if (!(node instanceof Node || node === null)) {
            throw new Error('not Node');
        }
        this.head = node;
    }

    setTail(node) {
        if (!(node instanceof Node || node === null)) {
            throw new Error('not Node');
        }
        this.tail = node;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }
}

class Circle {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addNode(data) {
        const newTail = new Node(data);
        if (!this.head && !this.tail) {
            this.head = newTail;
            this.tail = newTail;
        } else {
            this.tail.setTail(newTail);
            this.head.setHead(newTail);
            newTail.setHead(this.tail);
            newTail.setTail(this.head);
            this.tail = newTail;
        }
    }

    deleteNode(node, number) {
        if (node.head === null) {
            return node;
        }
        if (number === 1) {
            const head = node.getHead();
            const tail = node.getTail();
            if (head === tail) {
                head.setHead(null);
                head.setTail(null);
                return node;
            }
            head.setTail(tail);
            tail.setHead(head);
            return node;
        } else if (number > 1) {
            const nextNode = node.getTail();
            return this.deleteNode(nextNode, number - 1);
        }
    }
}

const exam = (input) => {
    const manNumber = Number(input[0]);
    const deleteNumber = Number(input[1]);
    const circle = new Circle();
    let result = '<';

    for (let i = 1; i < manNumber + 1; i++) {
        circle.addNode(i);
    }

    let currentNode = circle.head;

    for (let i = 1; i < manNumber + 1; i++) {
        const deletedNode = circle.deleteNode(currentNode, deleteNumber);
        result += deletedNode.data + ', ';
        currentNode = deletedNode.tail;
    }

    result = result.slice(0, -2) + '>';

    console.log(result);
};

exam(input);
