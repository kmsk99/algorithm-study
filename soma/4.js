const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

let count = 0;

const combination = (array, calory = 0) => {
    if (calory >= 2000 && calory <= 2500) {
        count++;
    } else if (calory > 2500) {
        return;
    }

    array.forEach((fixed, idx) => {
        const rest = array.slice(idx + 1);
        combination(rest, calory + fixed);
    });
};

rl.on('line', function (x) {
    input.push(x);
}).on('close', function () {
    const n = input[0];
    const a = input[1].split(' ').map((x) => +x);
    combination(a);
    console.log(count);
    process.exit();
});
