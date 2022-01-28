# 1406 - 에디터

## 1. 개요

https://www.acmicpc.net/problem/1406

## 2. 코드

```
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
```

## 3. 설명

1. 구현방법

    - doublyLinkedList를 변형한 리스트를 사용하여 에디터의 커서 위치를 정해주었다

2. 입력함수의 구현

```
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
```

    -fs 모듈을 불러온 뒤, 파일을 읽은 후, 문자열로 변환해준다
    -그 뒤 양옆 공백을 제거해주고 \n로 문자열을 배열로 분리하여준다.

3. 노드 구현

```
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
```

    - 노드는 양방향 노드로 좌우측 노드로 구분해준다.
    - 다음 노드를 세팅할 때에는 노드가 null이거나 노드 객체일 때만 추가하여준다

4. 에디터 노드의 구현

    - 에디터노드는 입력, 커서 좌측 이동, 커서 우측 이동, 삭제, 노드 프린트로 이루어져있다

```

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

```

    - 입력 메소드는 입력 문자열의 길이가 1 초과일 때, 콜백함수로 순차적으로 입력한다
    - 좌측 노드가 비어있지 않을 때, 좌측노드와 입력노드를 링크시켜준다
    - 우측 노드가 비어있지 않을 떄, 우측노드와 입력노드를 링크시켜준다
    - 좌측 노드를 입력 노드로 변경한다

```
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
```

## 4. 결과
