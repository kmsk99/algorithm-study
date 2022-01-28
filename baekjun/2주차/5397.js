// 키로거

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input = `2
// <<BP<A>>Cd-
// ThIsIsS3Cr3t`
//     .toString()
//     .trim()
//     .split('\n');

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    setLeftNode(node) {
        if (!(node instanceof Node || node === null)) {
            throw new Error('left not Node');
        }
        this.left = node;
    }

    setRightNode(node) {
        if (!(node instanceof Node || node === null)) {
            throw new Error('right not Node');
        }
        this.right = node;
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.right;
    }
}

class EditorNode {
    constructor() {
        this.leftNode = null;
        this.rightNode = null;
    }

    addNode(data) {
        if (data.length === 1) {
            const newLeft = new Node(data);
            if (this.leftNode !== null) {
                newLeft.setLeftNode(this.leftNode);
                this.leftNode.setRightNode(newLeft);
            }
            if (this.rightNode !== null) {
                newLeft.setRightNode(this.rightNode);
                this.rightNode.setLeftNode(newLeft);
            }
            this.leftNode = newLeft;
        } else if (data.length > 1) {
            for (let i = 0; i < data.length; i++) {
                this.addNode(data[i]);
            }
        }
    }

    moveLeft() {
        if (this.leftNode) {
            this.rightNode = this.leftNode;
            this.leftNode = this.leftNode.getLeft();
        }
    }

    moveRight() {
        if (this.rightNode) {
            this.leftNode = this.rightNode;
            this.rightNode = this.rightNode.getRight();
        }
    }

    deleteNode() {
        if (this.leftNode) {
            this.leftNode = this.leftNode.getLeft();
            if (this.leftNode) {
                this.leftNode.setRightNode(this.rightNode);
            }
            if (this.rightNode) {
                this.rightNode.setLeftNode(this.leftNode);
            }
        }
    }

    printNode() {
        let leftNode = this.leftNode;
        let rightNode = this.rightNode;
        let string = '';
        while (leftNode !== null) {
            string = leftNode.data + string;
            leftNode = leftNode.getLeft();
        }
        while (rightNode !== null) {
            string = string + rightNode.data;
            rightNode = rightNode.getRight();
        }
        console.log(string);
    }
}

const editor = (input) => {
    const caseCount = Number(input[0]);

    for (let i = 1; i < caseCount + 1; i++) {
        const editorNode = new EditorNode();
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === '<') {
                editorNode.moveLeft();
            } else if (input[i][j] === '>') {
                editorNode.moveRight();
            } else if (input[i][j] === '-') {
                editorNode.deleteNode();
            } else {
                editorNode.addNode(input[i][j]);
            }
        }
        editorNode.printNode();
    }
};

editor(input);
