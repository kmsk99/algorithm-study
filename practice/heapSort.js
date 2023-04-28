const heap = [1, 10, 5, 8, 7, 6, 4, 3, 2, 9];
const len = heap.length;

for (let i = 1; i < len; i++) {
    let c = i;
    do {
        const root = Math.floor((c - 1) / 2);
        if (heap[root] < heap[c]) {
            const temp = heap[root];
            heap[root] = heap[c];
            heap[c] = temp;
        }
        c = root;
    } while (c !== 0);
}

for (let i = len - 1; i >= 0; i--) {
    const temp = heap[0];
    heap[0] = heap[i];
    heap[i] = temp;
    let root = 0;
    let c = 1;
    do {
        c = 2 * root + 1;
        if (c < i - 1 && heap[c] < heap[c + 1]) {
            c++;
        }
        if (c < i && heap[root] < heap[c]) {
            const temp = heap[root];
            heap[root] = heap[c];
            heap[c] = temp;
        }
        root = c;
    } while (c < i);
}

for (i = 0; i < len; i++) {
    console.log(heap[i]);
}
