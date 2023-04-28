// AC

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(/\s/);
// const input = `4
// RDD
// 4
// [1,2,3,4]
// DD
// 1
// [42]
// RRD
// 6
// [1,1,2,3,5,8]
// D
// 0
// []`
//     .toString()
//     .trim()
//     .split(/\s/);

const inputArray = [];
const result = [];
for (let i = 0; i < Number(input[0]); i++) {
    inputArray.push(input.slice(3 * i + 1, 3 * i + 4));
}

for (let i = 0; i < Number(input[0]); i++) {
    const command = inputArray[i][0];
    const count = inputArray[i][1];
    const array = inputArray[i][2].slice(1, -1).split(',');
    let reversed = false;
    let front = 0;
    let back = 0;
    for (let j = 0; j < command.length; j++) {
        if (command[j] === 'R') {
            reversed = !reversed;
        } else if (command[j] === 'D') {
            if (reversed) {
                back++;
            } else {
                front++;
            }
        }
    }
    if (front + back > count) {
        result.push('error');
    } else {
        let resultArray = array.slice(front, back !== 0 ? -back : undefined);
        if (reversed) {
            resultArray = resultArray.reverse();
        }
        result.push(`[${resultArray.join(',')}]`);
    }
}

console.log(result.join('\n'));
