class Heap {
    constructor() {
        this.heap = [];
    }

    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

    insert = (key, value) => {
        const node = { key, value };
        this.heap.push(node);
        this.heapifyUp();
    };

    heapifyUp = () => {
        let index = this.heap.length - 1;
        const lastNode = this.heap[index];

        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex].key > lastNode.key) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            } else break;
        }

        this.heap[index] = lastNode;
    };

    remove = () => {
        const count = this.heap.length;
        const rootNode = this.heap[0];

        if (count === 0) return undefined;
        if (count === 1) this.heap = [];
        else {
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }

        return rootNode;
    };

    heapifyDown = () => {
        let index = 0;
        const count = this.heap.length;
        const rootNode = this.heap[0];

        while (this.getLeftChildIndex(index) < count) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);

            const smallerChildIndex =
                rightChildIndex < count &&
                this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
                    ? rightChildIndex
                    : leftChildIndex;

            if (this.heap[smallerChildIndex].key < rootNode.key) {
                this.heap[index] = this.heap[smallerChildIndex];
                index = smallerChildIndex;
            } else break;
        }

        this.heap[index] = rootNode;
    };
}

class PriorityQueue extends Heap {
    constructor() {
        super();
    }

    enqueue = (priority, value) => this.insert(priority, value);
    dequeue = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

const number = 6;
const a = [];
for (let i = 0; i < 7; i++) {
    a.push([]);
}
const d = new Array(7).fill(Infinity);

const dijkstra = (start) => {
    d[start] = 0;
    const pq = new PriorityQueue();

    pq.enqueue(0, start);
    while (!pq.isEmpty()) {
        const { key: distance, value: current } = pq.dequeue();
        if (d[current] < distance) continue;
        for (let i = 0; i < a[current].length; i++) {
            const next = a[current][i].value;
            const nextDistance = distance + a[current][i].key;
            if (nextDistance < d[next]) {
                d[next] = nextDistance;
                pq.enqueue(nextDistance, next);
            }
        }
    }
};

a[1].push({ value: 2, key: 2 });
a[1].push({ value: 3, key: 5 });
a[1].push({ value: 4, key: 1 });

a[2].push({ value: 1, key: 2 });
a[2].push({ value: 3, key: 3 });
a[2].push({ value: 4, key: 2 });

a[3].push({ value: 1, key: 5 });
a[3].push({ value: 2, key: 3 });
a[3].push({ value: 4, key: 3 });
a[3].push({ value: 5, key: 1 });
a[3].push({ value: 6, key: 5 });

a[4].push({ value: 1, key: 1 });
a[4].push({ value: 2, key: 2 });
a[4].push({ value: 3, key: 3 });
a[4].push({ value: 5, key: 1 });

a[5].push({ value: 3, key: 1 });
a[5].push({ value: 4, key: 1 });
a[5].push({ value: 6, key: 2 });

a[6].push({ value: 3, key: 5 });
a[6].push({ value: 5, key: 2 });

dijkstra(1);

console.log(d);

console.log(a);
