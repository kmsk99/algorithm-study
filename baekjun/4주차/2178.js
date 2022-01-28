// // 미로 탐색

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split(/\s/);
// // const input = `7 7
// // 1011111
// // 1110001
// // 1000001
// // 1000001
// // 1000001
// // 1000001
// // 1111111`
// //     .toString()
// //     .trim()
// //     .split(/\s/);

// const rows = Number(input[0]);
// const columns = Number(input[1]);
// const map = [];
// for (let i = 2; i < rows + 2; i++) {
//     const row = [];
//     for (let j = 0; j < columns; j++) {
//         row.push(input[i][j]);
//     }
//     map.push(row);
// }

// class Graph {
//     constructor() {
//         this.vertices = [];
//     }

//     addVertex(data) {
//         const newVertex = new Vertex(data);
//         this.vertices.push(newVertex);
//         return newVertex;
//     }

//     removeVertex(vertex) {
//         vertex.removeAllEdge();
//         this.vertices = this.vertices.filter((v) => v !== vertex);
//     }

//     addEdge(vertexOne, vertexTwo) {
//         if (!(vertexOne instanceof Vertex && vertexTwo instanceof Vertex)) {
//             throw new Error('not Vertex');
//         }
//         vertexOne.addEdge(vertexTwo);
//         vertexTwo.addEdge(vertexOne);
//     }

//     removeEdge(vertexOne, vertexTwo) {
//         if (!(vertexOne instanceof Vertex && vertexTwo instanceof Vertex)) {
//             throw new Error('not Vertex');
//         }
//         vertexOne.removeEdge(vertexTwo);
//         vertexTwo.removeEdge(vertexOne);
//     }

//     printVertex() {
//         const vertexList = this.vertices;
//         vertexList.forEach((vertex) => vertex.print());
//     }
// }

// class Vertex {
//     constructor(data) {
//         this.data = data;
//         this.edges = [];
//     }

//     addEdge(vertex) {
//         if (!(vertex instanceof Vertex)) {
//             throw new Error('not Vertex');
//         }
//         if (!this.edges.find((edge) => edge.end === vertex)) {
//             const newEdge = new Edge(this, vertex);
//             this.edges.push(newEdge);
//         }
//     }

//     removeEdge(vertex) {
//         if (!(vertex instanceof Vertex)) {
//             throw new Error('not Vertex');
//         }
//         this.edges = this.edges.filter((edge) => edge.end !== vertex);
//     }

//     removeAllEdge() {
//         this.edges.forEach((edge) => edge.end.removeEdge(this));
//         this.edges = [];
//     }

//     print() {
//         const edgeList = this.edges.map((edge) => edge.end.data) || [];
//         const output = `${this.data} --> ${edgeList.join(', ')}`;
//         console.log(output);
//     }
// }

// class Edge {
//     constructor(start, end) {
//         this.start = start;
//         this.end = end;
//     }
// }

// const maze = new Graph();

// for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < columns; j++) {
//         map[i][j] = maze.addVertex(`${map[i][j]} ${i} ${j}`);
//     }
// }

// for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < columns; j++) {
//         if (map[i][j].data[0] === '1') {
//             if (i > 0 && map[i - 1][j].data[0] === '1') {
//                 maze.addEdge(map[i - 1][j], map[i][j]);
//             }
//             if (i < rows - 1 && map[i + 1][j].data[0] === '1') {
//                 maze.addEdge(map[i + 1][j], map[i][j]);
//             }
//             if (j > 0 && map[i][j - 1].data[0] === '1') {
//                 maze.addEdge(map[i][j - 1], map[i][j]);
//             }
//             if (j < columns - 1 && map[i][j + 1].data[0] === '1') {
//                 maze.addEdge(map[i][j + 1], map[i][j]);
//             }
//         }
//     }
// }

// // maze.printVertex();

// const dijkstras = (graph, startingVertex) => {
//     const distances = {};
//     const previous = {};
//     const queue = new PriorityQueue();

//     queue.add({ vertex: startingVertex, priority: 0 });

//     graph.vertices.forEach((vertex) => {
//         distances[vertex.data] = Infinity;
//         previous[vertex.data] = null;
//     });

//     distances[startingVertex.data] = 1;

//     while (!queue.isEmpty()) {
//         const { vertex } = queue.popMin();

//         vertex.edges.forEach((edge) => {
//             const alternate = 1 + distances[vertex.data];
//             const neighborValue = edge.end.data;

//             if (alternate < distances[neighborValue]) {
//                 distances[neighborValue] = alternate;
//                 previous[neighborValue] = vertex;

//                 queue.add({
//                     vertex: edge.end,
//                     priority: distances[neighborValue],
//                 });
//             }
//         });
//     }

//     return { distances, previous };
// };

// class PriorityQueue {
//     constructor() {
//         this.heap = [null];
//         this.size = 0;
//     }

//     add({ vertex, priority }) {
//         this.heap.push({ vertex, priority });
//         this.size++;
//         this.bubbleUp();
//     }

//     isEmpty() {
//         return this.size === 0;
//     }

//     popMin() {
//         if (this.size === 0) {
//             return null;
//         }
//         const min = this.heap[1];
//         this.heap[1] = this.heap[this.size];
//         this.size--;
//         this.heap.pop();
//         this.heapify();
//         return min;
//     }

//     bubbleUp() {
//         let current = this.size;
//         while (
//             current > 1 &&
//             this.heap[getParent(current)].priority > this.heap[current].priority
//         ) {
//             this.swap(current, getParent(current));
//             current = getParent(current);
//         }
//     }

//     heapify() {
//         let current = 1;
//         let leftChild = getLeft(current);
//         let rightChild = getRight(current);
//         // Check that there is something to swap (only need to check the left if both exist)
//         while (this.canSwap(current, leftChild, rightChild)) {
//             // Only compare left & right if they both exist
//             if (this.exists(leftChild) && this.exists(rightChild)) {
//                 // Make sure to swap with the smaller of the two children
//                 if (
//                     this.heap[leftChild].priority <
//                     this.heap[rightChild].priority
//                 ) {
//                     this.swap(current, leftChild);
//                     current = leftChild;
//                 } else {
//                     this.swap(current, rightChild);
//                     current = rightChild;
//                 }
//             } else {
//                 // If only one child exist, always swap with the left
//                 this.swap(current, leftChild);
//                 current = leftChild;
//             }
//             leftChild = getLeft(current);
//             rightChild = getRight(current);
//         }
//     }

//     swap(a, b) {
//         [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
//     }

//     exists(index) {
//         return index <= this.size;
//     }

//     canSwap(current, leftChild, rightChild) {
//         // Check that one of the possible swap conditions exists
//         return (
//             (this.exists(leftChild) &&
//                 this.heap[current].priority > this.heap[leftChild].priority) ||
//             (this.exists(rightChild) &&
//                 this.heap[current].priority > this.heap[rightChild].priority)
//         );
//     }
// }

// const getParent = (current) => Math.floor(current / 2);
// const getLeft = (current) => current * 2;
// const getRight = (current) => current * 2 + 1;

// module.exports = PriorityQueue;

// const results = dijkstras(maze, map[0][0]);
// console.log(results.distances[`1 ${rows - 1} ${columns - 1}`]);

// module.exports = dijkstras;

const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n');

const [yMax, xMax] = input.shift().split(' ');

const map = input.map((v) => v.split('').map((x) => +x));

const stack = [[0, 0, 0]];

const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

while (stack.length) {
    const [x, y, dis] = stack.shift();

    for (let i = 0; i < 4; i++) {
        const xPos = x + dir[i][0];
        const yPos = y + dir[i][1];

        if (0 <= xPos && 0 <= yPos && xPos < xMax && yPos < yMax) {
            if (map[yPos][xPos] === 1) {
                map[yPos][xPos] = dis + 2;
                stack.push([xPos, yPos, dis + 1]);
            }
        }
    }
}

console.log(map[yMax - 1][xMax - 1]);
