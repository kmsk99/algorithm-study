// 다리 만들기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const size = +input.shift();
const map = input.map((v) => v.split(' ').map((x) => +x));

const mark = [];
const cost = [];
for (let i = 0; i < size; i++) {
    mark.push(new Array(size).fill(0));
    cost.push(new Array(size).fill(0));
}
let minLength = Infinity;
const dir = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
];
function sameIsland() {
    const countArray = [null];
    let count = 0;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (mark[y][x] !== 0 || map[y][x] === 0) continue;
            count++;
            mark[y][x] = count;
            const queue = [];
            queue.push([x, y]);
            countArray.push([]);
            countArray[count].push([x, y]);
            while (queue.length !== 0) {
                const [cx, cy] = queue.shift();
                mark[cy][cx] = count;
                for (let i = 0; i < 4; i++) {
                    const nx = cx + dir[i][0];
                    const ny = cy + dir[i][1];
                    if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
                    if (mark[ny][nx] !== 0 || map[ny][nx] === 0) continue;
                    mark[ny][nx] = count;
                    queue.push([nx, ny]);
                    countArray[count].push([nx, ny]);
                }
            }
        }
    }
    return countArray;
}

function findIsland(queue, number) {
    cost.forEach((x) => x.fill(0));
    while (queue.length !== 0) {
        const [cx, cy] = queue.shift();
        for (let i = 0; i < 4; i++) {
            const nx = cx + dir[i][0];
            const ny = cy + dir[i][1];
            if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
            if (mark[ny][nx] === number || cost[ny][nx] !== 0) continue;
            if (mark[ny][nx] !== 0 && mark[ny][nx] !== number) {
                minLength = Math.min(cost[cy][cx], minLength);
                return;
            }
            cost[ny][nx] = cost[cy][cx] + 1;
            queue.push([nx, ny]);
        }
    }
}

function findShortestBridge(array) {
    for (let i = 1; i < array.length; i++) {
        const queue = array[i];
        findIsland(queue, i);
    }
}

const array = sameIsland();
findShortestBridge(array);
console.log(minLength);
