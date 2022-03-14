const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

rl.on('line', function (x) {
    input.push(x);
}).on('close', function () {
    const [n, m] = input[0].split(' ').map((x) => +x);
    const a = input.slice(1, n).map((v) => v.split(' ').map((x) => +x));
    const v = input.slice(n).map((v) => v.split(' ').map((x) => +x));
    const map = new Array(n + 1).fill(null).map(() => []);
    const visit = new Array(n + 1).fill(false);
    const result = [];
    const hash = {};

    for (let i = 0; i < n - 1; i++) {
        const [u, v, w] = a[i];
        map[u].push([v, w]);
        map[v].push([u, w]);
    }

    for (let i = 0; i < m; i++) {
        hash[v[i][0]] = v[i][1];
    }

    const dfs = (start = 1, cost = 0) => {
        visit[start] = true;
        if (hash[start]) {
            result.push([start, hash[start] - 2 * cost]);
        }
        const nexts = map[start];
        nexts.forEach((v) => {
            const [n, c] = v;
            if (!visit[n]) {
                dfs(n, cost + c);
            }
        });
    };

    dfs();
    result.sort((a, b) => a[0] - b[0]);
    let max = [0, 0];

    for (let i = 0; i < result.length; i++) {
        if (max[1] < result[i][1]) {
            max = result[i];
        }
    }

    console.log(max.join(' '));

    process.exit();
});
