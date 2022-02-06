const number = 100000;
const a = new Array(10001).fill(0);

function primeNumberSieve() {
    for (let i = 2; i <= number; i++) {
        a[i] = i;
    }
    for (let i = 2; i <= number; i++) {
        if (a[i] === 0) continue;
        for (let j = i + i; j <= number; j += i) {
            a[j] = 0;
        }
    }
    for (let i = 2; i <= number; i++) {
        if (a[i] !== 0) console.log(a[i]);
    }
}

primeNumberSieve();
