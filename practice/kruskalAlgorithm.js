function getParent(parent, x) {
    if (parent[x] === x) return x;
    return getParent(parent, parent[x]);
}

function unionParent(parent, a, b) {
    a = getParent(parent, a);
    b = getParent(parent, b);
    a < b ? (parent[b] = a) : (parent[a] = b);
}

function findParent(parent, a, b) {
    a = getParent(parent, a);
    b = getParent(parent, b);
    return a === b;
}

class Edge {
    constructor(start, end, distance) {
        this.start = start;
        this.end = end;
        this.distance = distance;
    }
}

const n = 7;
const m = 11;
const vector = [];

vector.push(new Edge(1, 7, 12));
vector.push(new Edge(1, 4, 28));
vector.push(new Edge(1, 2, 67));
vector.push(new Edge(1, 5, 17));
vector.push(new Edge(2, 4, 24));
vector.push(new Edge(2, 5, 62));
vector.push(new Edge(3, 5, 20));
vector.push(new Edge(3, 6, 37));
vector.push(new Edge(4, 7, 13));
vector.push(new Edge(5, 6, 45));
vector.push(new Edge(5, 7, 73));

vector.sort((a, b) => a.distance - b.distance);

const set = new Array(n + 1);
for (let i = 1; i <= n; i++) {
    set[i] = i;
}

let sum = 0;
for (let i = 0; i < vector.length; i++) {
    if (!findParent(set, vector[i].start, vector[i].end)) {
        sum += vector[i].distance;
        unionParent(set, vector[i].start, vector[i].end);
    }
}

console.log(sum);
