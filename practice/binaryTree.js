class TreeNode {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class InsertNode {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new TreeNode(data);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while (current) {
            if (data === current.data) return;

            if (data < current.data) {
                if (!current.leftChild) {
                    current.leftChild = newNode;
                    break;
                }
                current = current.leftChild;
            }

            if (data > current.data) {
                if (!current.rightChild) {
                    current.rightChild = newNode;
                    break;
                }
                current = current.rightChild;
            }
        }
    }
}

function preorder(node) {
    if (node) {
        console.log(node.data);
        preorder(node.leftChild);
        preorder(node.rightChild);
    }
}

function inorder(node) {
    if (node) {
        inorder(node.leftChild);
        console.log(node.data);
        inorder(node.rightChild);
    }
}

function postorder(node) {
    if (node) {
        postorder(node.leftChild);
        postorder(node.rightChild);
        console.log(node.data);
    }
}

// const tree = new InsertNode();

const number = 15;
const tree = new Array(16);

for (let i = 1; i <= number; i++) {
    tree[i] = new TreeNode(i);
    if (i % 2 === 0) {
        tree[i / 2].leftChild = tree[i];
    }
    if (i % 2 === 1 && i !== 1) {
        tree[(i - 1) / 2].rightChild = tree[i];
    }
}

preorder(tree[1]);
inorder(tree[1]);
postorder(tree[1]);
