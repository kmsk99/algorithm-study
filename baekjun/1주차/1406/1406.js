const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    setLeftNode(node) {
        if (node instanceof Node || node === null) {
            this.left = node;
        }
    }

    setRightNode(node) {
        if (node instanceof Node || node === null) {
            this.right = node;
        }
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

const Editor = (input) => {
    const maxLength = input[1];
    const editorNode = new EditorNode();
    editorNode.addNode(input[0]);

    for (let i = 2; i < maxLength + 1; i++) {
        if (input[i] === 'L') {
            editorNode.moveLeft();
        } else if (input[i] === 'D') {
            editorNode.moveRight();
        } else if (input[i] === 'B') {
            editorNode.deleteNode();
        } else if (input[i] && input[i][0] === 'P') {
            editorNode.addNode(input[i].split(' ')[1]);
        }
    }

    editorNode.printNode();
};

Editor(input);
