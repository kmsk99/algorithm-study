const input = +require('fs').readFileSync('/dev/stdin').toString().trim();
// const input = 3;
const result = [];

const hanoi = (number, from, to, other) => {
    if (number === 0) return;
    hanoi(number - 1, from, other, to);
    result.push(`${from} ${to}`);
    hanoi(number - 1, other, to, from);
};

hanoi(input, 1, 3, 2);

result.unshift(result.length);

console.log(result.join('\n'));
