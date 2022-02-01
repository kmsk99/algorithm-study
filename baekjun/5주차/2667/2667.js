// 단지번호붙이기

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const size = input.shift();
const map = input.map((v) => v.split('').map((x) => +x));

const findMap = (size, map) => {
    const queue = [];
    const resultArray = [];
    const dir = [
        [0, 0, -1, 1],
        [-1, 1, 0, 0],
    ];

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (map[y][x] === 1) {
                queue.push([x, y]);
                map[y][x] = 0;
                let count = 1;

                while (queue.length > 0) {
                    const [cx, cy] = queue.shift();

                    for (let i = 0; i < 4; i++) {
                        const nx = cx + dir[0][i];
                        const ny = cy + dir[1][i];

                        if (nx < 0 || ny < 0 || nx >= size || ny >= size)
                            continue;
                        if (map[ny][nx] === 0) continue;

                        map[ny][nx] = 0;
                        queue.push([nx, ny]);
                        count++;
                    }
                }

                resultArray.push(count);
            }
        }
    }

    return [resultArray.length, ...resultArray.sort((a, b) => a - b)].join(
        '\n'
    );
};

const result = findMap(size, map);
console.log(result);
