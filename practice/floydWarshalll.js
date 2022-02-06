const number = 4;

const a = [
    [0, 5, Infinity, 8],
    [7, 0, 9, Infinity],
    [2, Infinity, 0, 4],
    [Infinity, Infinity, 3, 0],
];

function floydWarshall() {
    const d = a.slice();

    // k = 거쳐가는 노드
    for (let k = 0; k < number; k++) {
        // i = 출발 노드
        for (let i = 0; i < number; i++) {
            // j = 도착 노드
            for (let j = 0; j < number; j++) {
                if (d[i][k] + d[k][j] < d[i][j]) {
                    d[i][j] = d[i][k] + d[k][j];
                }
            }
        }
    }

    console.log(d);
}

floydWarshall();
