// 단순 다각형

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

let t = +input.shift();

while (t-- > 0) {
    const a = input
        .shift()
        .split(' ')
        .map((x) => +x);
    const n = a.shift();
    const b = new Array(n).fill(null).map(() => new Array(3));
    for (let i = 0; i < n; i++) {
        b[i][0] = a[2 * i];
        b[i][1] = a[2 * i + 1];
        b[i][2] = i;
    }

    b.sort((a, b) => {
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

    const anchor = b.shift();

    b.sort((a, b) => {
        if (radian(anchor, a) === radian(anchor, b))
            return dist(anchor, a) - dist(anchor, b);
        else return radian(anchor, a) - radian(anchor, b);
    });

    b.unshift(anchor);
    b.push(anchor);

    const result = [];

    let stopIdx = n;

    for (let i = n; i >= 0; i--) {
        if (ccw(anchor, b[i], b[i - 1]) !== 0) {
            stopIdx = i - 1;
            break;
        }
    }

    for (let i = 0; i <= stopIdx; i++) {
        result.push(b[i][2]);
    }

    for (let i = n - 1; i > stopIdx; i--) {
        result.push(b[i][2]);
    }

    console.log(result.join(' '));
}
