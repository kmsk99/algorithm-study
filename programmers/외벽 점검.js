function solution(n, weak, dist) {
    const rest = new Rest(n);
    dist.sort((a, b) => a - b);
    rest.recur(weak, dist);
    if (rest.result === -1) {
        return -1;
    } else {
        return dist.length - rest.result;
    }
}

class Rest {
    constructor(n) {
        this.result = -1;
        this.n = n;
    }

    safeRoad(weak) {
        const safe = [];
        if (weak.length === 1) {
            return weak;
        }
        for (let i = 1; i < weak.length; i++) {
            if (i === weak.length - 1) {
                safe.push([this.n - weak[i] + weak[0], weak[i], weak[0]]);
            }
            safe.push([weak[i] - weak[i - 1], weak[i - 1], weak[i]]);
        }
        safe.sort((a, b) => {
            return b[0] - a[0];
        });
        return safe.map((x) => x[2]).slice(0, 10);
    }

    patrol(weak, dist, start) {
        if (dist[dist.length - 1] >= this.n) return [[], dist.slice(0, -1)];
        const end = (start + dist[dist.length - 1]) % this.n;
        const nweak = weak.filter((x) => {
            if (start < end) {
                if (x < start || x > end) return true;
                return false;
            } else {
                if (x < start && x > end) return true;
                return false;
            }
        });
        return [nweak, dist.slice(0, -1)];
    }

    recur(weak, dist) {
        if (dist.length === 0 && weak.length !== 0) return;
        if (weak.length === 0) {
            this.result = Math.max(dist.length, this.result);
            return;
        }
        const safe = this.safeRoad(weak);
        for (let i = 0; i < safe.length; i++) {
            const [nweak, ndist] = this.patrol(weak, dist, safe[i]);
            this.recur(nweak, ndist);
        }
    }
}

// 제일 긴 친구부터 투입
// 안전한게 젤 긴 구간 직후부터 투입
