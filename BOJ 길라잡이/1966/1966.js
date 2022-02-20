// 스택 수열

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
while (input.length !== 0) {
    const [len, m] = input
        .shift()
        .split(' ')
        .map((x) => +x);
    const queue = input
        .shift()
        .split(' ')
        .map((x, idx) => [+x, idx]);
    let cnt = 0;

    while (true) {
        const node = queue.shift();

        if (queue.every((x) => x[0] <= node[0])) {
            cnt++;
            if (node[1] === m) {
                break;
            }
            continue;
        }

        queue.push(node);
    }

    console.log(cnt);
}
