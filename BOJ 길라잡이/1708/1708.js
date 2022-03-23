// 볼록 껍질

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input
    .map((v) => v.split(' ').map((x) => +x))
    .sort((a, b) => {
        if (a[1] === b[1]) return a[0] - b[0];
        else return a[1] - b[1];
    });

const ccw = (p1, p2, p3) => {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const [x3, y3] = p3;

    return x1 * y2 + x2 * y3 + x3 * y1 - (y1 * x2 + y2 * x3 + y3 * x1);
};

const radian = (p1, p2) => {
    return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
};

const dist = (anchor, pt) => {
    const [x1, y1] = [pt[0] - anchor[0], pt[1] - anchor[1]];
    return x1 ** 2 + y1 ** 2;
};

const anchor = a.shift();

a.sort((a, b) => {
    if (radian(anchor, a) === radian(anchor, b))
        return dist(anchor, a) - dist(anchor, b);
    else return radian(anchor, a) - radian(anchor, b);
});

a.push(anchor);

const stack = [anchor];

for (let i = 0; i < n; i++) {
    while (stack.length >= 2) {
        const pt1 = stack[stack.length - 2];
        const pt2 = stack[stack.length - 1];
        const pt3 = a[i];
        if (ccw(pt1, pt2, pt3) <= 0) {
            stack.pop();
        } else break;
    }
    stack.push(a[i]);
}

console.log(stack.length - 1);
