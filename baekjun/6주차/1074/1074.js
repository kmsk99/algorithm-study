// Z

const fs = require('fs');
const PATH = '/dev/stdin';
const input = fs.readFileSync(PATH).toString().trim().split(' ');
// const input = '10 512 512'.toString().trim().split(' ');

const number = +input[0];
const row = +input[1];
const col = +input[2];

function z(x, y, depth) {
    const posx = Math.floor((2 * x) / 2 ** depth);
    const posy = Math.floor((2 * y) / 2 ** depth);
    let pos;
    let result = 0;

    if (posx === 0 && posy === 0) pos = 0;
    if (posx === 1 && posy === 0) pos = 1;
    if (posx === 0 && posy === 1) pos = 2;
    if (posx === 1 && posy === 1) pos = 3;
    if (depth === 1) return pos;

    const size = 2 ** (2 * depth - 2);
    result += size * pos;
    result += z(
        x - posx * 2 ** (depth - 1),
        y - posy * 2 ** (depth - 1),
        depth - 1
    );
    return result;
}

console.log(z(col, row, number));
