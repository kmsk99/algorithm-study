const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

rl.on('line', function (x) {
    input.push(x);
}).on('close', function () {
    const [a, b] = input
        .shift()
        .split(' ')
        .map((x) => +x);
    const n = +input.shift();
    const array = input.map((v) => v.split(' ').map((x) => +x));

    const result = [];
    const list = [a, b];
    for (let i = 0; i < n; i++) {
        list.push(...array[i]);
        list.sort((a, b) => a - b);
        result.push([list[i + 1], list[2 * i + 3]]);
    }

    console.log(result.map((x) => x.join(' ')).join('\n'));

    process.exit();
});
