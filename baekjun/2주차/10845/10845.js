// 큐

const fs = require('fs');
const [n, ...input] = fs
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n');

// const [n, ...input] = `15
// push 1
// push 2
// front
// back
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
// front`
//     .toString()
//     .trim()
//     .split('\n');

const queueExam = (n, input) => {
    const queue = [];
    const result = [];
    const count = Number(n);
    let resultLog = '';
    let size = 0;

    for (let i = 0; i < count; i++) {
        if (input[i] === 'pop') {
            if (size === 0) {
                result.push(-1);
            } else {
                result.push(queue.shift());
                size--;
            }
        } else if (input[i] === 'size') {
            result.push(size);
        } else if (input[i] === 'empty') {
            size === 0 ? result.push(1) : result.push(0);
        } else if (input[i] === 'front') {
            size === 0 ? result.push(-1) : result.push(queue[0]);
        } else if (input[i] === 'back') {
            size === 0 ? result.push(-1) : result.push(queue[size - 1]);
        } else {
            queue.push(Number(input[i].slice(5)));
            size++;
        }
    }

    result.forEach((number) => (resultLog += number + '\n'));
    console.log(resultLog.slice(0, -1));
};

queueExam(n, input);
