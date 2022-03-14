// 광고

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().split('\n');

const n = +input[0];
const pat = input[1];

const computeLps = (pat, lps, m) => {
    let len = 0;
    lps[0] = 0;

    let i = 1;
    while (i < m) {
        if (pat[i] === pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
};

const lps = new Array(n);
computeLps(pat, lps, n);

console.log(n - lps[n - 1]);
