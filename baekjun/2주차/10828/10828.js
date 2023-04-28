// 스택

const fs = require('fs');
const [n, ...input] = fs
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n');
// const [n, ...input] = `14
// push 1
// push 2
// top
// size
// empty
// pop
// pop
// pop
// size
// empty
// pop
// push 3
// empty
// top`
//     .toString()
//     .trim()
//     .split('\n');

const stackProblem = (n, input) => {
    const stack = [];
    const result = [];
    let resultLog = '';
    let size = 0;
    const count = Number(n);

    for (let i = 0; i < count; i++) {
        if (input[i] === 'pop') {
            if (size === 0) {
                result.push(-1);
            } else {
                result.push(stack.pop());
                size--;
            }
        } else if (input[i] === 'size') {
            result.push(size);
        } else if (input[i] === 'empty') {
            size === 0 ? result.push(1) : result.push(0);
        } else if (input[i] === 'top') {
            size === 0 ? result.push(-1) : result.push(stack[size - 1]);
        } else {
            stack.push(input[i].slice(5));
            size++;
        }
    }

    result.forEach((number) => (resultLog += number + '\n'));
    console.log(resultLog.slice(0, -1));
};

stackProblem(n, input);
