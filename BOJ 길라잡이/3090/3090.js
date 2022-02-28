// 차이를 최소로

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, t] = input[0].split(' ').map((x) => +x);
const a = input[1].split(' ').map((x) => +x);
let b;

let left = 0;
let right = 1000000000;
let mid;

const minimize = (lim) => {
    let cnt = t;
    b = a.slice();
    for (let i = 1; i < n; i++) {
        if (b[i] - b[i - 1] > lim) {
            let temp = b[i - 1] + lim;
            cnt -= b[i] - temp;
            if (cnt < 0) {
                cnt += b[i] - temp;
                b[i] = b[i] - cnt;
                return false;
            }
            b[i] = temp;
        }
    }
    for (let i = n - 1; i >= 0; i--) {
        if (b[i] - b[i + 1] > lim) {
            let temp = b[i + 1] + lim;
            cnt -= b[i] - temp;
            if (cnt < 0) {
                cnt += b[i] - temp;
                b[i] = b[i] - cnt;
                return false;
            }
            b[i] = temp;
        }
    }
    return true;
};

while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (minimize(mid)) right = mid - 1;
    else left = mid + 1;
}

minimize(left);
console.log(b.join(' '));
