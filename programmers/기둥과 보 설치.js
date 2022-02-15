function solution(n, build_frame) {
    const builder = new Dp(n);
    for (const order of build_frame) {
        builder.order(order);
    }

    return builder.print();
}

class Dp {
    constructor(n) {
        this.size = n;
        this.dp = new Array(n + 1);
        this.result = {};
        for (let i = 0; i < n + 1; i++) {
            this.dp[i] = new Array(n + 1);
            for (let j = 0; j < n + 1; j++) {
                this.dp[i][j] = new Array(2).fill(false);
            }
        }
    }

    restrict(x, y, a) {
        if (a === 0) {
            if (x < 0 || y < 0 || x > this.size || y > this.size) return true;
            if (y === 0) return true;
            if (this.dp[y][x][1]) return true;
            if (x - 1 >= 0 && this.dp[y][x - 1][1]) return true;
            if (y - 1 >= 0 && this.dp[y - 1][x][0]) return true;
        } else if (a === 1) {
            if (x < 0 || y < 0 || x > this.size || y > this.size) return true;
            if (this.dp[y - 1][x][0]) return true;
            if (y - 1 >= 0 && x + 1 <= this.size && this.dp[y - 1][x + 1][0])
                return true;
            if (
                x - 1 >= 0 &&
                x + 1 <= this.size &&
                this.dp[y][x - 1][1] &&
                this.dp[y][x + 1][1]
            )
                return true;
        }
        return false;
    }

    build(x, y, a) {
        if (a === 0) {
            if (!this.restrict(x, y, a)) return;
            this.dp[y][x][a] = true;
            this.result[`${x},${y},${a}`] = true;
        } else if (a === 1) {
            if (!this.restrict(x, y, a)) return;
            this.dp[y][x][a] = true;
            this.result[`${x},${y},${a}`] = true;
        }
    }

    rest0(x, y, a) {
        if (y + 1 <= this.size && this.dp[y + 1][x][0]) {
            if (!this.restrict(x, y + 1, 0)) return false;
        }
        if (y + 1 <= this.size && this.dp[y + 1][x][1]) {
            if (!this.restrict(x, y + 1, 1)) return false;
        }
        if (y + 1 <= this.size && x - 1 >= 0 && this.dp[y + 1][x - 1][1]) {
            if (!this.restrict(x - 1, y + 1, 1)) return false;
        }
        return true;
    }

    rest1(x, y, a) {
        if (this.dp[y][x][0]) {
            if (!this.restrict(x, y, 0)) return false;
        }
        if (x + 1 <= this.size && this.dp[y][x + 1][0]) {
            if (!this.restrict(x + 1, y, 0)) return false;
        }
        if (x - 1 >= 0 && this.dp[y][x - 1][1]) {
            if (!this.restrict(x - 1, y, 1)) return false;
        }
        if (x + 1 <= this.size && this.dp[y][x + 1][1]) {
            if (!this.restrict(x + 1, y, 1)) return false;
        }
        return true;
    }

    destroy(x, y, a) {
        if (a === 0) {
            this.dp[y][x][a] = false;
            if (this.rest0(x, y, a)) {
                delete this.result[`${x},${y},${a}`];
                return;
            }
            this.dp[y][x][a] = true;
        } else if (a === 1) {
            this.dp[y][x][a] = false;
            if (this.rest1(x, y, a)) {
                delete this.result[`${x},${y},${a}`];
                return;
            }
            this.dp[y][x][a] = true;
        }
    }

    order(order) {
        if (order[3] === 1) {
            this.build(order[0], order[1], order[2]);
        } else if (order[3] === 0) {
            this.destroy(order[0], order[1], order[2]);
        }
    }

    print() {
        const array = Object.keys(this.result)
            .map((v) => v.split(',').map((x) => +x))
            .sort(this.sorting);
        return array;
    }

    sorting(a, b) {
        if (a[0] === b[0]) {
            if (a[1] === b[1]) return a[2] - b[2];
            else return a[1] - b[1];
        } else return a[0] - b[0];
    }
}

// 3차원 격자 생성 n n 2
// 2차원 원소마다 기둥 보 존재 유무 0 1 true false로 표현
// 기둥 제한조건
// x y 0일때 y === 0 || x-1 y 1 true || x y 1 true || x y-1 0 true
// 보 제한조건
// x y 1일때 x y-1 0 true || x-1 y-1 0 true || x-1 y 1 && x+1 y 1 true
// 제한조건 확인 하고 쌓음
// 제거 조건 = 일단 지워보고 제한조건 만족 못하면 원상복귀
// 기둥일 때
// x y 0일때 x y+1 0, x y+1 1, x-1 y+1 1 확인
// 보일때
// x y 1일때 x y 0, x-1 y 1, x+1 y 1 확인
// 결과 저장 방식
// 해시맵으로 [x, y, a] = true
// 삭제할 때는 delete
