// 옥상 정원 꾸미기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input[0];
const heights = input.slice(1).map((x) => +x);
const stack = [];
const views = new Array(n).fill(0);

for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1][0] < heights[i]) {
        const [_, view] = stack.pop();
        views[i] += view + 1;
    }
    stack.push([heights[i], views[i]]);
}

const result = views.reduce((acc, cur) => (acc += cur), 0);
console.log(result);

// 스택 [높이, 길이]
// 최초 0, 0
// 오른쪽 끝부터 시작
// 스택사이즈 확인
// 스택의 높이가 현재보다 작다면 팝, 현재 길이 += 스택길이 +1
// 스택에 쌓음 [현재 높이, 현재길이]
// 스택 높이가 현재보다 크거나 같다면 [현재높이, 현재길이(0)] 쌓음
