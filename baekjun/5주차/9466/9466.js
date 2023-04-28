// 텀 프로젝트

const fs = require('fs');
const PATH = '/dev/stdin';
const test = './testcase.txt';
const input = fs.readFileSync(PATH).toString().trim().split('\n');

const t = +input[0];
const ns = new Array(t);
const students = new Array(t);
for (let i = 0; i < t; i++) {
    ns[i] = +input[2 * i + 1];
    students[i] = [null, ...input[2 * i + 2].split(' ').map((x) => +x)];
}
const result = [];

for (let i = 0; i < t; i++) {
    const student = students[i];
    const n = ns[i];
    const visited = new Array(n + 1).fill(false);
    const done = new Array(n + 1).fill(false);
    let cnt = 0;

    const dfs = (num) => {
        visited[num] = true;

        const next = student[num];
        if (!visited[next]) {
            dfs(next);
        } else if (visited[next] && !done[next]) {
            for (let j = next; j !== num; j = student[j]) {
                cnt++;
                done[next] = true;
            }
            cnt++;
        }
        done[num] = true;
    };

    for (let j = 1; j < n + 1; j++) {
        if (visited[j]) continue;
        dfs(j);
    }

    result.push(n - cnt);
}

console.log(result.join('\n'));
