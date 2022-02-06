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
        return edge;
    }
}

function dfs(x) {
    d[x] = ++id;
    console.log(d);
    stack.push(x);

    let parent = d[x];
    for (let i = 0; i < a[x].edges.length; i++) {
        const y = a[x].edges[i].end.data;
        if (d[y] === 0) {
            parent = Math.min(parent, dfs(y));
        } else if (!finishied[y]) {
            parent = Math.min(parent, d[y]);
        }
    }

    if (parent === d[x]) {
        const scc = [];
        while (1) {
            let t = stack.pop();
            scc.push(t);
            finishied[t] = true;
            if (t === x) break;
        }
        SCC.push(scc);
    }

    return parent;
}

let id = 0;
const v = 11;
const d = new Array(12).fill(0);
const finishied = new Array(12).fill(false);
const SCC = [];
const stack = [];
const graph = new Graph();
const a = new Array(12);
for (let i = 1; i <= 11; i++) {
    a[i] = graph.addNode(i);
}

graph.addEdge(a[1], a[2]);
graph.addEdge(a[2], a[3]);
graph.addEdge(a[3], a[1]);
graph.addEdge(a[4], a[2]);
graph.addEdge(a[4], a[5]);
graph.addEdge(a[5], a[7]);
graph.addEdge(a[6], a[5]);
graph.addEdge(a[7], a[6]);
graph.addEdge(a[8], a[5]);
graph.addEdge(a[8], a[9]);
graph.addEdge(a[9], a[10]);
graph.addEdge(a[10], a[11]);
graph.addEdge(a[11], a[3]);
graph.addEdge(a[11], a[8]);

for (let i = 1; i <= v; i++) {
    if (d[i] === 0) {
        dfs(i);
    }
}
console.log(d);
console.log(SCC);
