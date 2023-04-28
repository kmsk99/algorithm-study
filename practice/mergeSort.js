const array = [1, 10, 5, 8, 7, 6, 4, 3, 2, 9];
const len = array.length;
const sorted = new Array(len);
let count = 0;

function merge(a, m, middle, n) {
    let i = m;
    let j = middle + 1;
    let k = m;

    while (i <= middle && j <= n) {
        if (a[i] <= a[j]) {
            sorted[k] = a[i];
            i++;
        } else {
            sorted[k] = a[j];
            j++;
        }
        k++;
    }

    if (i > middle) {
        for (let t = j; t <= n; t++) {
            sorted[k] = a[t];
            k++;
        }
    } else {
        for (let t = i; t <= middle; t++) {
            sorted[k] = a[t];
            k++;
        }
    }

    for (let t = m; t <= n; t++) {
        a[t] = sorted[t];
    }
}

function mergeSort(a, m, n) {
    if (m < n) {
        const middle = Math.floor((m + n) / 2);
        mergeSort(a, m, middle);
        mergeSort(a, middle + 1, n);
        merge(a, m, middle, n);
    }
}

mergeSort(array, 0, len - 1);
for (i = 0; i < len; i++) {
    console.log(array[i]);
}
