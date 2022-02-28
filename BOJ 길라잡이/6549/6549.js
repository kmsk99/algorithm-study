// 히스토그램에서 가장 큰 직사각형

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

for (let i = 0; input[i] !== '0'; i++) {
    const [n, ...arr] = input[i].split(' ').map((x) => BigInt(x));
    const stack = [];

    const getArea = (len) => {
        let maxArea = 0n;

        for (let i = 0n; i < len; i++) {
            while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
                const height = arr[stack.pop()];
                const width =
                    stack.length === 0 ? i : i - 1n - stack[stack.length - 1];
                maxArea = maxArea > height * width ? maxArea : height * width;
            }

            stack.push(i);
        }

        while (stack.length > 0) {
            const height = arr[stack.pop()];
            const width =
                stack.length === 0 ? len : len - 1n - stack[stack.length - 1];
            maxArea = maxArea > height * width ? maxArea : height * width;
        }

        return maxArea;
    };

    console.log(String(getArea(n)));
}
