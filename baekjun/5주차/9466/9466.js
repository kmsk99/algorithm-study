// 텀 프로젝트

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(test).toString().trim().split('\n');

const count = +input[0];
const inputArray = [];
const result = [];

for (let i = 0; i < count; i++) {
    inputArray[i] = [];
    inputArray[i].push(+input[2 * i + 1]);
    inputArray[i].push([null, ...input[2 * i + 2].split(' ').map((x) => +x)]);
}

const dfs = (array, start) => {};

for (let i = 0; i < count; i++) {
    const visited = new Array(number + 1).fill(false);
    const done = new Array(number + 1).fill(false);
    for (let j = 1; j < inputArray[i][0] + 1; j++) {
        // if (visited[j]) continue;
    }
    result.push(done.reduce((acc, cur) => (acc + cur ? 0 : 1)));
}
console.log(result.join('\n'));
