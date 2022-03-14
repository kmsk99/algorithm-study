// 찾기

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().split('\n');

const t = input[0];
const p = input[1];

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

const kmp = (pat, txt) => {
    const result = [];
    const m = pat.length;
    const n = txt.length;
    const lps = new Array(m).fill(0);
    computeLps(pat, lps, m);

    let i = 0;
    let j = 0;
    while (i < n) {
        if (pat[j] === txt[i]) {
            j++;
            i++;
        }

        if (j === m) {
            result.push(i - j + 1);
            j = lps[j - 1];
        } else if (i < n && pat[j] !== txt[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i = i + 1;
            }
        }
    }

    return result;
};

const result = kmp(p, t);
console.log(result.length);
console.log(result.join('\n'));
