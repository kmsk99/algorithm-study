// 히스토그램에서 가장 큰 직사각형

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

for (let i = 0; input[i] !== '0'; i++) {
    const [n, ...arr] = input[i].split(' ').map((x) => BigInt(x));

    const getMidArea = (lo, hi, mid) => {
        let toLeft = mid;
        let toRight = mid;

        let height = arr[mid];

        let maxArea = height;

        while (lo < toLeft && hi > toRight) {
            if (arr[toLeft - 1n] < arr[toRight + 1n]) {
                toRight++;
                height = height < arr[toRight] ? height : arr[toRight];
            } else {
                toLeft--;
                height = height < arr[toLeft] ? height : arr[toLeft];
            }

            maxArea =
                maxArea > height * (toRight - toLeft + 1n)
                    ? maxArea
                    : height * (toRight - toLeft + 1n);
        }

        while (toRight < hi) {
            toRight++;
            height = height < arr[toRight] ? height : arr[toRight];
            maxArea =
                maxArea > height * (toRight - toLeft + 1n)
                    ? maxArea
                    : height * (toRight - toLeft + 1n);
        }

        while (toLeft > lo) {
            toLeft--;
            height = height < arr[toLeft] ? height : arr[toLeft];
            maxArea =
                maxArea > height * (toRight - toLeft + 1n)
                    ? maxArea
                    : height * (toRight - toLeft + 1n);
        }

        return maxArea;
    };

    const getArea = (lo, hi) => {
        if (hi === lo) {
            return arr[lo];
        }

        let mid = (lo + hi) / 2n;

        let leftArea = getArea(lo, mid);
        let rightArea = getArea(mid + 1n, hi);

        let max = leftArea > rightArea ? leftArea : rightArea;

        max = max > getMidArea(lo, hi, mid) ? max : getMidArea(lo, hi, mid);

        return max;
    };

    const result = getArea(0n, n - 1n);
    console.log(result + '');
}
