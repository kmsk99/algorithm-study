# 2667 - 단지번호붙이기

## 1. 개요

https://www.acmicpc.net/problem/2667

## 2. 코드

```
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
```

## 3. 설명

1. 구현방법

    - bfs를 이용하여 모든 지점에 대해 순회를 도는 방식으로 구현하였다

2. 입력 구현

    ```
    const size = input.shift();
    const map = input.map((v) => v.split('').map((x) => +x));
    ```

3. 함수 구현

    - 최초, 배열과 결과 배열, 방향 배열을 선언해준다

    ```
    const findMap = (size, map) => {
        const queue = [];
        const resultArray = [];
        const dir = [
            [0, 0, -1, 1],
            [-1, 1, 0, 0],
        ];
    ```

    - 맵의 각 지점에 대해 순회한 뒤, 맵의 값이 1일때, 큐에 값을 넣어준 후, 맵의 값을 0으로 바꾸고 카운트를 시작한다

    ```
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (map[y][x] === 1) {
                queue.push([x, y]);
                map[y][x] = 0;
                let count = 1;
    ```

    - 큐의 길이가 0 이상일 때, 큐의 반환값 좌표를 cx, cy로 선언한다
    - 이후 4 방향에 걸쳐 새로운 좌표 nx, ny를 선언한다
    - nx ny가 맵 밖에 있거나 지점의 값이 0일 때 다음 루프로 넘어간다
    - 맵의 값을 0으로 바꾸고, 큐에 현재 좌표를 추가한 뒤, 카운트를 추가한다
    - 이후 while문이 끝나면 결과 배열에 카운트를 추가한다

    ```
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
    ```

## 4. 최선의 코딩 방법

-   최초, 현재 위치와 결과 배열, 맵 배열, 마크 배열, 카운트, 방향을 선언한다
-   bfs 함수를 따로 분리하여준다 bfs함수는 좌표와 카운트 값을 가진다
-   맵을 만들고, 마크의 빈배열을 만든다
-   맵이 1이고 마크가 0일 때 bfs를 실행한 뒤, 결과값을 결과 배열에 추가한다

```
var input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

var size = +input[0].trim();
var ix, jx, result = [],
    map = [], mark = [], count = 0,
    dx = [1, -1, 0, 0], dy = [0, 0, 1, -1];

function bfs(x, y, count) {
    var queue = [], v, kx, nx, ny, number = 1;

    queue.push([x, y]);
    mark[x][y] = count;

    while (queue.length) {
        v = queue.shift();

        for (kx = 0; kx < 4; kx++) {
            nx = v[0] + dx[kx];
            ny = v[1] + dy[kx];

            if (0 <= nx && nx < size && 0 <= ny && ny < size) {
                if (map[nx][ny] === 1 && mark[nx][ny] === 0) {
                    queue.push([nx, ny]);
                    mark[nx][ny] = count;
                    number++;
                }
            }
        }
    }

    return number;
}

for (ix = 1; ix <= size; ix++) {
    map[ix - 1] = [];
    mark[ix - 1] = [];

    for (jx = 0; jx < size; jx++) {
        mark[ix - 1][jx] = 0;
        map[ix - 1][jx] = +input[ix][jx];
    }
}

for (ix = 0; ix < size; ix++) {
    for (jx = 0; jx < size; jx++) {
        if (map[ix][jx] === 1 && mark[ix][jx] === 0) {
            result.push(bfs(ix, jx, ++count));
        }
    }
}

console.log(count);
console.log(result.sort(function(a, b) { return a - b; }).join('\n'));
```
