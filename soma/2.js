const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

rl.on('line', function (x) {
    input.push(x);
}).on('close', function () {
    const [n, q] = input.shift().map((x) => +x);
    const a = input.shift();
    process.exit();
});
