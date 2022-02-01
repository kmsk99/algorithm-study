# 1158 - 요세푸스 문제

## 1. 개요

https://www.acmicpc.net/problem/1158

## 2. 코드

```
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
```

## 3. 설명

1. 구현방법
    - 노드와 서클 클래스를 구현한 뒤, 노드를 삭제한다
2. 노드 구현

    ```
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
    ```

3. 서클 구현

    - deleteNode는 재귀함수 형태로 구현한다

    ```
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
    ```

## 4. 최선의 코딩 방법

-   큐, 서클배열, 헤드를 선언한다
-   배열에 숫자를 넣어준다
-   배열의 길이가 0 이상일 동안
    -   헤드의 값을 추가하고
    -   만일 헤드의 값이 서클 배열의 길이보다 크다면 나머지를 구하며
    -   큐에 서클 배열의 헤드 값을 구해 넣어주고
    -   서클 어레이에서 헤드만을 splice로 잘라내준다
-   이후 답을 출력한다

```
var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString().split(' ');

function solution(N, M) {
    var queue = [];
    var circleArray = [];
    var head = 0;

    for (var i = 0; i < N; i++) {
        circleArray.push(i + 1)
    }

    while (circleArray.length > 0) {
        head += (M - 1);
        if(head >= circleArray.length){
            head %= circleArray.length;
        }
        queue.push(circleArray[head])
        circleArray.splice(head, 1);
    }

    return '<'+queue.join(', ')+'>';
}

console.log(solution(parseInt(input[0]), parseInt(input[1])));
```
