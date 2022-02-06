const max = 101;

class Node {
    constructor(data) {
        this.data = data;
        this.edges = [];
    }
}

class Edge {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

class Graph {
    constructor() {
        this.nodes = [];
    }

    addNode(data) {
        const node = new Node(data);
        this.nodes.push(node);
        return node;
    }

    addEdge(start, end) {
        const edge = new Edge(start, end);
        start.edges.push(edge);
    }
}

const graph = new Graph();
const n = 3;
const a = [null];
for (let i = 1; i < n + 1; i++) {
    a[i] = graph.addNode(i);
}
const d = new Array(n + 1).fill(0);
const c = new Array(n + 1).fill(false);
let m, s;

function dfs(x) {
    for (let i = 0; i < a[x].edges.length; i++) {
        let t = a[x].edges[i].end.data;
        console.log(t);
        if (c[t]) continue;
        c[t] = true;

        if (d[t] === 0 || dfs(d[t])) {
            d[t] = x;
            return true;
        }
    }
    return false;
}

graph.addEdge(a[1], a[1]);
graph.addEdge(a[1], a[2]);
graph.addEdge(a[1], a[3]);
graph.addEdge(a[2], a[1]);
graph.addEdge(a[3], a[2]);

let count = 0;
for (let i = 1; i <= n; i++) {
    c.fill(false);
    if (dfs(i)) count++;
}
console.log(d);
console.log(a);
