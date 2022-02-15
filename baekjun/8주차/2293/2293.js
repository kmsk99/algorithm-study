// 동전 1

// 'use strict';

// const fs = require('fs');
// const PATH = '/dev/stdin';
// const test = './testcase.txt';
// const input = fs.readFileSync(PATH).toString().trim().split('\n');
// const [n, k] = input[0].split(' ').map((x) => +x);
// const coins = input.slice(1).map((x) => +x);
// const d = new Array(k + 1).fill(0);
// d[0] = 1;

// for (let i = 0; i < n; i++) {
//     for (let j = 1; j <= k; j++) {
//         if (j >= coins[i]) {
//             d[j] += d[j - coins[i]];
//         }
//     }
// }

// console.log(d);

// 동전 1

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(test).toString().trim().split('\n');

const [n, k] = input[0].split(' ').map((x) => +x);
const coins = [0, ...input.slice(1).map((x) => +x)];

const map = [];
for (let i = 0; i < n + 1; i++) {
    map.push(new Array(k + 1).fill(0));
}

map.forEach((a) => (a[0] = 1));

for (let y = 1; y < n + 1; y++) {
    for (let x = 1; x < k + 1; x++) {
        if (x - coins[y] < 0) {
            map[y][x] = map[y - 1][x];
        } else {
            map[y][x] = map[y - 1][x] + map[y][x - coins[y]];
        }
    }
}

console.log(map);
