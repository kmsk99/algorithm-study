// 가르침

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const [n, k] = input
    .shift()
    .split(' ')
    .map((x) => +x);

const chars = (word) => {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
        const cur = word.charCodeAt(i) - 'a'.charCodeAt(0);
        hash = hash | (1 << cur);
    }
    return hash;
};

const a = input.map((x) => chars(x.slice(4, -4)));

const learnHash = () => {
    let hash = chars('antatica');
    for (let i = 0; i < n; i++) {
        hash = hash | a[i];
    }
    return hash;
};

const learn = learnHash();

const findMax = () => {
    let count = 0;
    for (let i = 0; i < 26; i++) {
        if ((learn & (1 << i)) === 0) continue;
        count++;
    }
    return count;
};

const max = findMax();

const dfs = (num, hash, check) => {
    if (num < 0) return 0;
    if (k >= max) return n;

    if (num === 0) {
        let count = 0;
        for (let i = 0; i < n; i++) {
            if ((a[i] & hash) === a[i]) count++;
        }
        return count;
    }

    let result = 0;

    for (let i = check; i < 26; i++) {
        if ((hash & (1 << i)) !== 0) continue;
        if ((learn & (1 << i)) === 0) continue;

        result = Math.max(result, dfs(num - 1, hash | (1 << i), i));
    }

    return result;
};

const answer = dfs(k - 5, chars('antatica'), 0);

console.log(answer);
