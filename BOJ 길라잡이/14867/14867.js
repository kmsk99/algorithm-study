// 물통

'use strict';

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split(' ');

const [a, b, c, d] = input.map((x) => +x);

class Water {
    constructor(a, b, c, d) {
        this.acap = a;
        this.bcap = b;
        this.c = c;
        this.d = d;
    }

    command(x, y, z) {
        switch (z) {
            case 0:
                return this.fill(x, y, 0);
            case 1:
                return this.fill(x, y, 1);
            case 2:
                return this.empty(x, y, 0);
            case 3:
                return this.empty(x, y, 1);
            case 4:
                return this.move(x, y, 0);
            case 5:
                return this.move(x, y, 1);
            default:
                break;
        }
    }

    finish(x, y) {
        if (x === c && y === d) return true;
        else return false;
    }

    fill(x, y, z) {
        if (z === 0) {
            x = this.acap;
        } else {
            y = this.bcap;
        }
        return [x, y];
    }

    empty(x, y, z) {
        if (z === 0) {
            x = 0;
        } else {
            y = 0;
        }
        return [x, y];
    }

    move(x, y, z) {
        if (z === 0) {
            if (x + y > this.bcap) {
                x = x + y - this.bcap;
                y = this.bcap;
            } else {
                y = x + y;
                x = 0;
            }
        } else {
            if (x + y > this.acap) {
                y = x + y - this.acap;
                x = this.acap;
            } else {
                x = x + y;
                y = 0;
            }
        }
        return [x, y];
    }
}

const bfs = () => {
    const water = new Water(a, b, c, d);
    const queue = [[0, 0, 0]];
    const visit = {};
    let idx = 0;

    while (queue.length > idx) {
        const [x, y, i] = queue[idx];
        if (water.finish(x, y)) {
            return i;
        }
        visit[`${x},${y}`] = true;
        for (let z = 0; z < 6; z++) {
            const [nx, ny] = water.command(x, y, z);
            if (visit[`${nx},${ny}`]) continue;
            queue.push([nx, ny, i + 1]);
        }
        idx++;
    }

    return -1;
};

console.log(bfs());
