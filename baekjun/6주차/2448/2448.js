// 별 찍기 -11

const fs = require('fs');
const PATH = '/dev/stdin';
const input = +fs.readFileSync(PATH).toString().trim();
// const input = +'24'.toString().trim();

function star(input) {
    let result = [];
    if (input === 3) {
        result.push('  *  ');
        result.push(' * * ');
        result.push('*****');
        return result;
    }

    const space = ' '.repeat(input / 2);
    const prev = star(input / 2);
    prev.forEach((row) => result.push(space + row + space));
    prev.forEach((row) => result.push(row + ' ' + row));

    return result;
}

// 3 5, 6 11, 24 23, 48 47, 96
console.log(star(input).join('\n'));
