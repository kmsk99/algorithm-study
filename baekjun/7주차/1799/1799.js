// 비숍

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');
const size = +input.shift();
const map = input.map((v) => v.split(' ').map((x) => +x));

const diagonal1 = new Array(2 * size - 1).fill(false);
const diagonal2 = new Array(2 * size - 1).fill(false);
let maxB = 0;
let maxW = 0;

function chessB(number, prev) {
    for (let y = prev[1]; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (y === prev[1] && x < prev[0]) continue;
            if ((x + y) % 2 === 1) continue;
            if (
                map[y][x] === 0 ||
                diagonal1[size - 1 + x - y] ||
                diagonal2[x + y]
            )
                continue;

            diagonal1[size - 1 + x - y] = true;
            diagonal2[x + y] = true;
            chessB(number + 1, [x, y]);
            diagonal1[size - 1 + x - y] = false;
            diagonal2[x + y] = false;
        }
    }

    maxB = Math.max(number, maxB);
    return;
}

function chessW(number, prev) {
    for (let y = prev[1]; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (y === prev[1] && x < prev[0]) continue;
            if ((x + y) % 2 === 0) continue;
            if (
                map[y][x] === 0 ||
                diagonal1[size - 1 + x - y] ||
                diagonal2[x + y]
            )
                continue;

            diagonal1[size - 1 + x - y] = true;
            diagonal2[x + y] = true;
            chessW(number + 1, [x, y]);
            diagonal1[size - 1 + x - y] = false;
            diagonal2[x + y] = false;
        }
    }

    maxW = Math.max(number, maxW);
    return;
}

chessB(0, [0, 0]);
chessW(0, [1, 0]);
console.log(maxB + maxW);
