const fs = require('fs');
const PATH = '/dev/stdin';
const input = +fs.readFileSync(PATH).toString().trim();

const isUsed = [];
let result = 0;

for (let i = 0; i < input + 1; i++) {
    isUsed.push(new Array(input + 1).fill(false));
}

const isSameRow = (x, y) => {
    return isUsed[y].some((element) => element === true);
};

const isSameCol = (x, y) => {
    for (let i = 1; i < input + 1; i++) {
        if (isUsed[i][x]) return true;
    }
    return false;
};

const isDiaRightDown = (x, y) => {
    const num = x - y;
    for (let i = 1; i < input + 1; i++) {
        if (i + num <= 0 || i + num > input) continue;
        if (isUsed[i][i + num]) return true;
    }
    return false;
};

const isDiaLeftDown = (x, y) => {
    const num = x + y;
    for (let i = 1; i < input + 1; i++) {
        if (num - i <= 0 || num - i > input) continue;
        if (isUsed[i][num - i]) return true;
    }
    return false;
};

const queen = (isUsed, current, target) => {
    if (current.length === target) {
        result++;
        return;
    }
    for (let x = 1; x < input + 1; x++) {
        const y = current.length + 1;
        if (
            isSameRow(x, y) ||
            isSameCol(x, y) ||
            isDiaRightDown(x, y) ||
            isDiaLeftDown(x, y)
        )
            continue;
        current.push([x, y]);
        isUsed[y][x] = true;
        queen(isUsed, current, target);
        current.pop();
        isUsed[y][x] = false;
    }
};

queen(isUsed, [], input);
console.log(result);
// 한 줄에 퀸 하나씩 갈수있음
// 통과하는 집합 중 하나
