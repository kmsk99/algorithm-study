// 별 찍기 - 10

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const input = +fs.readFileSync(PATH).toString().trim();

function star(input) {
    const cell = [];

    if (input === 3) {
        cell.push('***');
        cell.push('* *');
        cell.push('***');
        return cell;
    }

    const prev = star(input / 3);
    prev.forEach((x) => {
        cell.push(x.repeat(3));
    });
    prev.forEach((x) => {
        cell.push(x + ' '.repeat(input / 3) + x);
    });
    prev.forEach((x) => {
        cell.push(x.repeat(3));
    });

    return cell;
}

console.log(star(input).join('\n'));
