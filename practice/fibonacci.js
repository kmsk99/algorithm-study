let d = new Array(100).fill(0);

function fibonacci(x) {
    if (x === 1) return 1;
    if (x === 2) return 1;
    if (d[x] !== 0) return d[x];
    d[x] = fibonacci(x - 1) + fibonacci(x - 2);
    return d[x];
}

console.log(fibonacci(30));
