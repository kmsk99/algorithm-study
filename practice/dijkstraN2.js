const number = 6;

const a = [
    [0, 2, 5, 1, Infinity, Infinity],
    [2, 0, 3, 2, Infinity, Infinity],
    [5, 3, 0, 3, 1, 5],
    [1, 2, 3, 0, 1, Infinity],
    [Infinity, Infinity, 1, 1, 0, 2],
    [Infinity, Infinity, 5, Infinity, 2, 0],
];
const v = new Array(number).fill(false);
const d = new Array(number).fill(Infinity);

function getSmallIndex() {
    let min = Infinity;
    let index = 0;
    for (let i = 0; i < number; i++) {
        if (d[i] < min && !v[i]) {
            min = d[i];
            index = i;
        }
    }
    return index;
}

function dijkstra(start) {
    for (let i = 0; i < number; i++) {
        d[i] = a[start][i];
    }
    v[start] = true;
    for (let i = 0; i < number - 2; i++) {
        let current = getSmallIndex();
        v[current] = true;
        for (let j = 0; j < number; j++) {
            if (!v[j]) {
                if (d[current] + a[current][j] < d[j]) {
                    d[j] = d[current] + a[current][j];
                }
            }
        }
    }
}

dijkstra(0);
for (let i = 0; i < number; i++) {
    console.log(d[i]);
}
