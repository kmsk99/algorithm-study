// 스도쿠

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');
const a = input.map((v) => v.split(' ').map((x) => +x));

const isRow = (x, y, v) => {
    for (let i = 0; i < 9; i++) {
        if (a[y][i] === v) return false;
    }
    return true;
};

const isCol = (x, y, v) => {
    for (let i = 0; i < 9; i++) {
        if (a[i][x] === v) return false;
    }
    return true;
};

const isCell = (x, y, v) => {
    const cx = Math.floor(x / 3) * 3;
    const cy = Math.floor(y / 3) * 3;
    for (let i = cy; i < cy + 3; i++) {
        for (let j = cx; j < cx + 3; j++) {
            if (a[i][j] === v) return false;
        }
    }
    return true;
};

const nextEmpty = () => {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (a[y][x] === 0) {
                return [x, y];
            }
        }
    }
    return [-1, -1];
};

const dfs = (cx, cy, val) => {
    if (!isCell(cx, cy, val)) {
        return false;
    }
    if (!isCol(cx, cy, val)) {
        return false;
    }
    if (!isRow(cx, cy, val)) {
        return false;
    }

    a[cy][cx] = val;
    const [nx, ny] = nextEmpty();

    if (nx === -1 && ny === -1) {
        return true;
    }

    for (let i = 1; i < 10; i++) {
        if (dfs(nx, ny, i)) {
            return true;
        }
    }

    a[cy][cx] = 0;
    return false;
};

const [x, y] = nextEmpty();
if (x !== -1 || y !== -1) {
    for (let i = 1; i < 10; i++) {
        dfs(x, y, i);
    }
}
console.log(a.map((v) => v.join(' ')).join('\n'));
