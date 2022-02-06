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
        end.edges.push(edge);
    }
}

let result = 0;
const number = 6;
const a = new Array(7);
const d = new Array(7);
const c = [];
const f = [];
for (let i = 0; i < 7; i++) {
    f.push(new Array(7).fill(0));
    c.push(new Array(7).fill(0));
}
const graph = new Graph();

for (let i = 1; i <= 6; i++) {
    a[i] = graph.addNode(i);
}

graph.addEdge(a[1], a[2], 12);
graph.addEdge(a[1], a[4], 11);
graph.addEdge(a[2], a[3], 6);
graph.addEdge(a[2], a[4], 3);
graph.addEdge(a[2], a[5], 5);
graph.addEdge(a[2], a[6], 9);
graph.addEdge(a[3], a[6], 8);
graph.addEdge(a[4], a[5], 9);
graph.addEdge(a[5], a[3], 3);
graph.addEdge(a[5], a[6], 4);
c[1][2] = 12;
c[1][4] = 11;
c[2][3] = 6;
c[2][4] = 3;
c[2][5] = 5;
c[2][6] = 9;
c[3][6] = 8;
c[4][5] = 9;
c[5][3] = 3;
c[5][6] = 4;

function maxFlow(start, end) {
    while (1) {
        d.fill(-1);
        const queue = [];
        queue.push(start);
        while (queue.length !== 0) {
            let x = queue.shift();
            for (let i = 0; i < a[x].edges.length; i++) {
                let y = a[x].edges[i].end.data;
                if (c[x][y] - f[x][y] > 0 && d[y] === -1) {
                    queue.push(y);
                    d[y] = x;
                    if (y === end) break;
                }
            }
        }
        if (d[end] === -1) break;
        let flow = Infinity;
        for (let i = end; i != start; i = d[i]) {
            flow = Math.min(flow, c[d[i]][i] - f[d[i]][i]);
        }
        for (let i = end; i != start; i = d[i]) {
            f[d[i]][i] += flow;
            f[i][d[i]] -= flow;
        }
        result += flow;
    }
}

maxFlow(1, 6);
console.log(result);
