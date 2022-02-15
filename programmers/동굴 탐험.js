function solution(n, path, order) {
    const cave = new Graph(n);
    for (let i = 0; i < n - 1; i++) {
        cave.link(path[i]);
    }

    for (let i = 0; i < order.length; i++) {
        cave.order(order[i]);
    }

    const stack = [];
    if (cave.hash[0].pre) return false;
    stack.push(0);
    const hash = {};
    while (stack.length > 0) {
        const [linked, disordered] = cave.disconnect(stack.pop());
        if (disordered) {
            if (hash[disordered]) {
                stack.push(disordered);
                delete hash[disordered];
            }
        }
        linked.forEach((num) => {
            if (cave.hash[num].pre === null) {
                stack.push(num);
            } else {
                hash[num] = true;
            }
        });
    }
    if (Object.keys(hash).length === 0) return true;

    return false;
}

class Node {
    constructor() {
        this.links = {};
        this.pre = null;
        this.post = null;
        this.isRoot = false;
    }
}

class Graph {
    constructor(n) {
        this.hash = {};
        for (let i = 0; i < n; i++) {
            this.hash[i] = new Node();
        }
        this.root = this.hash[0];
        this.hash[0].isRoot = true;
    }

    link(pair) {
        const node1 = this.hash[pair[0]];
        const node2 = this.hash[pair[1]];
        node1.links[pair[1]] = node2;
        node2.links[pair[0]] = node1;
    }

    order(pair) {
        const node1 = this.hash[pair[0]];
        const node2 = this.hash[pair[1]];
        node1.post = pair[1];
        node2.pre = pair[0];
    }

    disconnect(index) {
        if (!this.hash[index].isRoot) return [];
        if (this.hash[index].pre) return [];
        const disordered = this.disorder(index);
        const linkedNodeKeys = Object.keys(this.hash[index].links);
        const linkedNodes = Object.values(this.hash[index].links);
        linkedNodes.forEach((node) => {
            delete node.links[index];
            node.isRoot = true;
        });
        delete this.hash[index];
        return [linkedNodeKeys, disordered];
    }

    disorder(index) {
        if (!this.hash[index].post) return null;
        const disordered = this.hash[index].post;
        this.hash[this.hash[index].post].pre = null;
        this.hash[index].post = null;
        return disordered;
    }
}

// nlog n n으로 풀어야됨
// 디스코넥트 한 숫자들 해쉬와 스택에 쌓음
// 쌓을 때 전제조건 없는 것 스택과 있는 것 해쉬로 따로 쌓음
// 전제조건 없는 해쉬 디스코넥트 하다가 디스올더드 발견하면 해쉬에 있는지 여부 확인하고 끌어옴;
// 스택 사라져도 안보이면 펄스
// 스택 사라졌을 때 해쉬 길이 0이라면 트루
