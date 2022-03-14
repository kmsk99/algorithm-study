// 접미사 배열
'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

const back = (string) => {
    const strings = [];
    for (let i = 0; i < string.length; i++) {
        strings.push(string.slice(i));
    }
    strings.sort();
    console.log(strings.join('\n'));
};

rl.on('line', function (line) {
    input.push(line);
}).on('close', function () {
    back(input[0]);
    process.exit();
});
