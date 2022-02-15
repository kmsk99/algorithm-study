// 인싸들의 가위바위보

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map((v) => +v);
const map = new Array(n + 1);
map[0] = new Array(n + 1).fill(0);
for (let i = 1; i < n + 1; i++) {
    map[i] = [0, ...input[i].split(' ').map((x) => +x)];
}
const rsp = new Array(3);
rsp[0] = new Array(20).fill(0);
rsp[1] = input[n + 1].split(' ').map((x) => +x);
rsp[2] = input[n + 2].split(' ').map((x) => +x);
const used = new Array(n + 1).fill(0);
const scores = new Array(3).fill(0);
const ptr = new Array(3).fill(0);
let result = 0;

function winCheck(cmd1, cmd2) {
    if (map[cmd1][cmd2] === 2) {
        return true;
    } else {
        return false;
    }
}

function go(p1, p2) {
    if (scores[0] >= k) {
        result = 1;
        return;
    }

    if (scores[1] >= k || scores[2] >= k) return;

    if (ptr[0] > n) return;

    if (p1 > p2) [p1, p2] = [p2, p1];

    if (winCheck(rsp[p1][ptr[p1]], rsp[p2][ptr[p2]])) {
        ptr[p1]++;
        ptr[p2]++;
        scores[p1]++;
        go(p1, 3 - p1 - p2);
    } else {
        ptr[p1]++;
        ptr[p2]++;
        scores[p2]++;
        go(p2, 3 - p1 - p2);
    }
}

function slove(depth) {
    if (result === 1) return;

    if (depth === n) {
        go(0, 1);

        ptr.fill(0);
        scores.fill(0);

        return;
    }

    for (let i = 1; i <= n; i++) {
        if (result === 1) return;
        if (used[i] === 1) continue;

        rsp[0][depth] = i;
        used[i] = 1;
        slove(depth + 1);
        used[i] = 0;
    }
}
if (k > n) {
    result = 0;
} else {
    slove(0);
}

console.log(result);
