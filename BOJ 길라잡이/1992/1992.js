// 쿼드트리

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

let N = +input.shift();
let image = input.join('').split('');

const zip = (x, y, n, arr) => {
    const [ul, ur, dl, dr] = [
        arr[x + y * n],
        arr[x + y * n + 1],
        arr[x + (y + 1) * n],
        arr[x + (y + 1) * n + 1],
    ];

    if (ul === '1' && ur === '1' && dl === '1' && dr === '1') {
        return '1';
    } else if (ul === '0' && ur === '0' && dl === '0' && dr === '0') {
        return '0';
    }

    return '(' + [ul, ur, dl, dr].join('') + ')';
};

const downSize = (array, n) => {
    const down = [];

    for (let y = 0; y < n; y += 2) {
        for (let x = 0; x < n; x += 2) {
            down.push(zip(x, y, n, array));
        }
    }

    return down;
};

while (N !== 1) {
    image = downSize(image, N);
    N /= 2;
}

console.log(image.join(''));
