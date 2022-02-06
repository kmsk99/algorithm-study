const max = 8;

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

let n;
const inDegree = new Array(max).fill(0);
const a = new Array(max);
const graph = new Graph();

for (let i = 1; i < max; i++) {
    a[i] = graph.addNode(i);
}

function topologySort() {
    let result = new Array(max);
    q = [];
    // 진입 차수가 0인 노드를 큐에 삽입합니다.
    for (let i = 1; i <= n; i++) {
        if (inDegree[i] === 0) q.push(i);
    }
    // 정렬이 완전히 수행되려면 정확히 n개의 노드를 방문합니다.
    for (let i = 1; i <= n; i++) {
        // n개를 방문하기 전에 큐가 비어버리면 사이클이 발생한 것입니다.
        if (q.length === 0) {
            console.log('사이클이 발생했습니다.');
            return;
        }
        let x = q.shift();
        result[i] = x;
        for (let i = 0; i < a[x].edges.length; i++) {
            let y = a[x].edges[i].end.data;
            // 새롭게 진입차수가 0이 된 정점을 큐에 삽입합니다.
            inDegree[y]--;
            if (inDegree[y] == 0) q.push(y);
        }
    }
    console.log(result);
}

n = 7;
graph.addEdge(a[1], a[2]);
inDegree[2]++;
graph.addEdge(a[1], a[5]);
inDegree[5]++;
graph.addEdge(a[2], a[3]);
inDegree[3]++;
graph.addEdge(a[3], a[4]);
inDegree[4]++;
graph.addEdge(a[4], a[6]);
inDegree[6]++;
graph.addEdge(a[5], a[6]);
inDegree[6]++;
graph.addEdge(a[6], a[7]);
inDegree[7]++;
topologySort();
