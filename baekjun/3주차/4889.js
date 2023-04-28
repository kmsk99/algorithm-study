// 안정적인 문자열

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input = `}{
// {}{}{}
// {{{}
// ---`
//     .toString()
//     .trim()
//     .split('\n');

const result = [];

for (let i = 0; i < input.length; i++) {
    if (input[i][0] === '-') {
        break;
    }
    const stack = [];
    let change = 0;
    let size = 0;
    for (let j = 0; j < input[i].length; j++) {
        if (size === 0 && input[i][j] === '}') {
            change++;
            stack.push('{');
            size++;
        } else if (stack[size - 1] === '{' && input[i][j] === '}') {
            stack.pop();
            size--;
        } else if (input[i][j] === '{') {
            stack.push('{');
            size++;
        }
    }
    if (size !== 0) {
        change += size / 2;
    }
    result.push(`${i + 1}. ${change}`);
}

console.log(result.join('\n'));
