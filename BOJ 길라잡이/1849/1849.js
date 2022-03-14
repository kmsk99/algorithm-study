// 순열

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const n = +input.shift();
const a = [null, ...input.map((x) => +x)];
const dp = new Array(n + 1).fill(0);

class Fenwick {
    constructor(size) {
        this.size = size;
        this.tree = new Array(this.size + 1).fill(0);
        for (let i = 1; i <= this.size; i++) {
            this.update(i, 1);
        }
    }

    sum1(index) {
        let answer = 0;
        while (index > 0) {
            answer += this.tree[index];
            index -= index & -index;
        }

        return answer;
    }

    sum(left, right) {
        return this.sum1(right) - this.sum1(left - 1);
    }

    update(index, diff) {
        while (index <= this.size) {
            this.tree[index] += diff;
            index += index & -index;
        }
    }
}

const segment = new Fenwick(n);

for (let i = 1; i <= n; i++) {
    const num = a[i];

    let left = 1;
    let right = n;
    let mid;

    while (left <= right) {
        mid = Math.floor((left + right) / 2);

        if (segment.sum(1, mid) <= num) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    dp[left] = i;
    segment.update(left, -1);
}

console.log(dp.slice(1).join('\n'));
