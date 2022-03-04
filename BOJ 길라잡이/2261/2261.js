// 가장 가까운 두 점

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = input.map((v) => v.split(' ').map((x) => +x));

const dist = (a, b) => {
    return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]);
};

const cmpY = (a, b) => {
    return a[1] - b[1];
};

const cmpX = (a, b) => {
    return a[0] - b[0];
};

a.sort(cmpX);

const brute = (start, end) => {
    let minDist = Number.MAX_VALUE;

    for (let i = start; i < end; i++) {
        const x0 = a[i];
        for (let j = i +1; j <= end; j++) {
            minDist = Math.min(minDist, dist(x0, a[j]));
        }
    }

    return minDist;
};

const middleBand = (start, mid, end, minDist) => {
    let xDist;

    const list = [];

    let midX = a[mid][0];
    for (let i = start; i <= end; i++) {
        xDist = a[i][0] - midX;

        if (xDist * xDist < minDist) {
            list.push(a[i]);
        }
    }

    list.sort(cmpY);

    let yDist;
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = i + 1; j < list.length; j++) {
            yDist = list[i][1] - list[j][1];
            if (yDist * yDist < minDist) {
                minDist = Math.min(dist(list[i], list[j]), minDist);
            } else {
                break;
            }
        }
    }

    return minDist;

}

const closest = (start, end) => {
    if (end - start + 1 < 4) {
        return brute(start, end);
    }

    const mid = Math.floor((start + end) / 2);

    const left = closest(start, mid);
    const right = closest(mid + 1, end);

    const minDist = Math.min(left, right);

    const band = middleBand(start, mid, end, minDist);
    return Math.min(minDist, band);
}

const result = closest(0, n-1);
console.log(result);