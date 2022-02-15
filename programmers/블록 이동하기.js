function solution(board) {
    const size = board.length;
    const visited = new Array(size);
    const cost = new Array(size);
    for (let i = 0; i < size; i++) {
        visited[i] = new Array(size);
        cost[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            visited[i][j] = new Array(2).fill(false);
            cost[i][j] = new Array(2).fill(Infinity);
        }
    }
    visited[0][0][0] = true;
    cost[0][0][0] = 0;
    const dir = [
        [1, -1, 0, 0],
        [0, 0, 1, -1],
    ];
    const queue = new Queue();
    queue.enqueue([0, 0, 0, 0]);

    while (!queue.isEmpty()) {
        const [cx, cy, cd, cc] = queue.dequeue();
        if (
            (cx === size - 2 && cy === size - 1 && cd === 0) ||
            (cx === size - 1 && cy === size - 2 && cd === 1)
        ) {
            return cc;
        }
        for (let i = 0; i < 8; i++) {
            if (i < 4) {
                const [nx, ny] = [cx + dir[0][i], cy + dir[1][i]];
                const [nd, nc] = [cd, cc + 1];

                if (nd === 0) {
                    if (nx < 0 || nx + 1 >= size || ny < 0 || ny >= size)
                        continue;
                    if (board[ny][nx] === 1 || board[ny][nx + 1] === 1)
                        continue;
                } else {
                    if (nx < 0 || nx >= size || ny < 0 || ny + 1 >= size)
                        continue;
                    if (board[ny][nx] === 1 || board[ny + 1][nx] === 1)
                        continue;
                }

                if (visited[ny][nx][nd]) continue;
                visited[ny][nx][nd] = true;
                cost[ny][nx][nd] = nc;
                queue.enqueue([nx, ny, nd, nc]);
            } else {
                let nx, ny;
                const nc = cc + 1;
                const nd = cd === 0 ? 1 : 0;
                if (cd === 0) {
                    if (i === 4 || i === 5) {
                        if (i === 4) {
                            [nx, ny] = [cx, cy];
                        } else {
                            [nx, ny] = [cx + 1, cy];
                        }
                        if (
                            cx < 0 ||
                            cx + 1 >= size ||
                            cy < 0 ||
                            cy + 1 >= size
                        )
                            continue;
                        if (
                            board[cy + 1][cx + 1] === 1 ||
                            board[cy + 1][cx] === 1
                        )
                            continue;
                    } else {
                        if (i === 6) {
                            [nx, ny] = [cx, cy - 1];
                        } else {
                            [nx, ny] = [cx + 1, cy - 1];
                        }
                        if (
                            cx < 0 ||
                            cx + 1 >= size ||
                            cy - 1 < 0 ||
                            cy >= size
                        )
                            continue;
                        if (
                            board[cy - 1][cx + 1] === 1 ||
                            board[cy - 1][cx] === 1
                        )
                            continue;
                    }
                } else {
                    if (i === 4 || i === 5) {
                        if (i === 4) {
                            [nx, ny] = [cx - 1, cy];
                        } else {
                            [nx, ny] = [cx - 1, cy + 1];
                        }
                        if (
                            cx - 1 < 0 ||
                            cx >= size ||
                            cy < 0 ||
                            cy + 1 >= size
                        )
                            continue;
                        if (
                            board[cy + 1][cx - 1] === 1 ||
                            board[cy][cx - 1] === 1
                        )
                            continue;
                    } else {
                        if (i === 6) {
                            [nx, ny] = [cx, cy];
                        } else {
                            [nx, ny] = [cx, cy + 1];
                        }
                        if (
                            cx < 0 ||
                            cx + 1 >= size ||
                            cy < 0 ||
                            cy + 1 >= size
                        )
                            continue;
                        if (
                            board[cy + 1][cx + 1] === 1 ||
                            board[cy][cx + 1] === 1
                        )
                            continue;
                    }
                }

                if (visited[ny][nx][nd]) continue;
                visited[ny][nx][nd] = true;
                cost[ny][nx][nd] = nc;
                queue.enqueue([nx, ny, nd, nc]);
            }
        }
    }
    return;
}

// 방문 좌표 n n 2(가로세로)
// 움직임 상하좌우 아래시계 위시계 아래반시계 위 반시계 i 8
// 큐 두개 각각 들어가서 둘중하나라도 불가하면 스킵
// 코스트좌표 기록

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    dequeue() {
        if (!this.head) return;
        const node = this.head;
        if (this.head.next === null) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        return node.data;
    }

    isEmpty() {
        if (this.head) {
            return false;
        } else {
            return true;
        }
    }
}
