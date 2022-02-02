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

parent = new Array(11);
for (let i = 1; i <= 10; i++) {
    parent[i] = i;
}

console.log(parent);
unionParent(parent, 1, 2);
unionParent(parent, 2, 3);
unionParent(parent, 3, 4);
unionParent(parent, 5, 6);
unionParent(parent, 6, 7);
unionParent(parent, 7, 8);
console.log(findParent(parent, 1, 5));
unionParent(parent, 1, 5);
console.log(findParent(parent, 1, 5));

console.log(parent);
