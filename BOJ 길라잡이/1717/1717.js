// 집합의 표현

'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];

const fun = (input) => {
    const [n, m] = input
        .shift()
        .split(' ')
        .map((x) => +x);

    const a = input.map((v) => v.split(' ').map((x) => +x));

    const b = new Array(n + 1).fill(null).map((_, idx) => idx);
    const result = [];

    const findParent = (x) => {
        if (x === b[x]) return x;
        b[x] = findParent(b[x]);
        return b[x];
    };

    const isUnion = (x, y) => {
        x = findParent(x);
        y = findParent(y);
        return x === y ? 'YES' : 'NO';
    };

    const setUnion = (x, y) => {
        x = findParent(x);
        y = findParent(y);
        if (x < y) {
            b[y] = x;
        } else {
            b[x] = y;
        }
    };

    for (let i = 0; i < m; i++) {
        const [c, x, y] = a[i];
        if (c === 0) {
            setUnion(x, y);
        } else if (c === 1) {
            result.push(isUnion(x, y));
        }
    }

    console.log(result.join('\n'));
};

rl.on('line', function (line) {
    input.push(line);
}).on('close', function () {
    fun(input);
    process.exit();
});
