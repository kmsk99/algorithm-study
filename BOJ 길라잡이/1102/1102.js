// 최솟값 찾기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const toNum = (string) => {
    let answer = 0;
    for (let i = 0; i < n; i++) {
        answer += string[i] * Math.pow(2, i);
    }
    return answer;
};

const sum = (num) => {
    let answer = 0;
    while (num !== 0) {
        if (num % 2 === 1) answer++;
        num = Math.floor(num / 2);
    }
    return answer;
};

const n = +input.shift();
const a = input.slice(0, n).map((v) => v.split(' ').map((x) => +x));
const b = toNum(
    input[n]
        .split('')
        .map((x) => (x === 'Y' ? 1 : 0))
        .join('')
);
const p = +input[n + 1];

const dp = new Array(Math.pow(2, n)).fill(-1);

const tsp = (visited) => {
    if (sum(visited) >= p) return 0;

    if (dp[visited] !== -1) return dp[visited];

    dp[visited] = Infinity;

    for (let i = 0; i < n; i++) {
        if (!(visited & (1 << i))) continue;
        for (let j = 0; j < n; j++) {
            if (visited & (1 << j)) continue;
            dp[visited] = Math.min(
                dp[visited],
                tsp(visited | (1 << j)) + a[i][j]
            );
        }
    }

    return dp[visited];
};

const result = tsp(b);

console.log(result === Infinity ? -1 : result);
